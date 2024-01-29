import {
  GaxiosPromise,
  auth,
  drive_v3,
  drive as googledrive,
} from "@googleapis/drive";

import { GoogleDriveConfig, UploadFileProps } from "./types";
import { toReadable } from "./utils";

const createFolders = async (
  drive: drive_v3.Drive,
  folders: string[],
  makePublic: boolean,
  emailAddress?: string
) => {
  let lastFolderId: string | null = null;

  for (let i = 0; i < folders.length; i++) {
    const folderName = folders[i];
    const res: Awaited<GaxiosPromise<drive_v3.Schema$File>> =
      await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: "application/vnd.google-apps.folder",
          ...(lastFolderId ? { parents: [lastFolderId] } : {}),
        },
        fields: "id",
      });

    if (emailAddress) {
      await drive.permissions.create({
        fileId: res.data.id || undefined,
        requestBody: {
          type: "user",
          role: "writer",
          emailAddress,
        },
      });
    }

    if (makePublic) {
      await drive.permissions.create({
        fileId: res.data.id || undefined,
        requestBody: {
          type: "anyone",
          role: "reader",
        },
      });
    }

    lastFolderId = res.data.id || null;
  }

  return lastFolderId;
};

export const createGoogleDriveUploader = ({
  credentials,
  sharedWithEmail,
}: GoogleDriveConfig) => {
  return async ({
    data,
    fileName,
    mimeType,
    public: makePublic,
  }: UploadFileProps) => {
    const authClient = await auth.getClient({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = googledrive({ version: "v3", auth: authClient });
    const stream = toReadable(data);
    let parentId: string | null = null;

    // Create folders if you have to
    const folders = fileName.split("/");
    fileName = folders.pop() as string;
    if (folders.length) {
      parentId = await createFolders(
        drive,
        folders,
        makePublic || true,
        sharedWithEmail
      );
    }

    const file = await drive.files.create({
      media: {
        body: stream,
        mimeType: mimeType || "application/octet-stream",
      },
      fields: "webContentLink, id",
      requestBody: {
        name: fileName,
        mimeType: mimeType || "application/octet-stream",
        ...(parentId ? { parents: [parentId] } : {}),
      },
    });

    if (sharedWithEmail) {
      await drive.permissions.create({
        fileId: file.data.id || undefined,
        requestBody: {
          type: "user",
          role: "writer",
          emailAddress: sharedWithEmail,
        },
      });
    }

    if (makePublic) {
      await drive.permissions.create({
        fileId: file.data.id || undefined,
        requestBody: {
          type: "anyone",
          role: "reader",
        },
      });
    }

    return file.data.webContentLink || null;
  };
};
