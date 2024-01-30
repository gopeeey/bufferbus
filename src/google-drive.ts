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
  let lastFolderId: string = "";
  const parentIds: string[] = [];

  for (let i = 0; i < folders.length; i++) {
    const folderName = folders[i];
    let folder: drive_v3.Schema$File | null = null;

    // Check if the folder already exists
    if (i === 0) {
      // The first folder is the root folder and should not have any parents
      const res = await drive.files.list({
        q: `name = '${folderName.replace(/'/g, "\\'")}' and trashed = false`,
        fields: "files(id, parents)",
      });

      folder = res.data.files?.find((f) => f.parents?.length === 1) || null;
    } else {
      // The rest of the folders should have a parent folder
      const res = await drive.files.list({
        q:
          `name = '${folderName.replace(/'/g, "\\'")}' and trashed = false` +
          parentIds.map((id) => ` and '${id}' in parents`).join(" "),
        fields: "files(id, parents)",
      });

      folder = res.data.files?.at(0) || null;
    }

    if (folder) {
      // Folder already exists, so we'll use it
      parentIds.push(folder.id as string);
      lastFolderId = folder.id as string;
    } else {
      // Folder doesn't exist, so we'll create it
      const res: Awaited<GaxiosPromise<drive_v3.Schema$File>> =
        await drive.files.create({
          requestBody: {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            ...(lastFolderId ? { parents: [lastFolderId] } : {}),
          },
          fields: "id",
        });

      // Share the folder with the email address
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

      // Make the folder public if requested
      if (makePublic) {
        await drive.permissions.create({
          fileId: res.data.id || undefined,
          requestBody: {
            type: "anyone",
            role: "reader",
          },
        });
      }
      parentIds.push(res.data.id as string);
      lastFolderId = res.data.id as string;
    }
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

    // Check if the file already exists
    const existingRes = await drive.files.list({
      q:
        `name = '${fileName.replace(/'/g, "\\'")}' and trashed = false` +
        (parentId ? ` and '${parentId}' in parents` : ""),
      fields: "files(id, parents)",
    });

    const existingFile = existingRes.data.files?.at(0) || null;

    // Upload/update the file
    let file: drive_v3.Schema$File;
    if (existingFile) {
      const res = await drive.files.update({
        media: {
          body: stream,
          mimeType: mimeType || "application/octet-stream",
        },
        fields: "webContentLink, id",
        fileId: existingFile.id as string,
        requestBody: {
          name: fileName,
          mimeType: mimeType || "application/octet-stream",
        },
      });

      file = res.data;
    } else {
      const res = await drive.files.create({
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

      file = res.data;
    }

    // Share the file with the email address
    if (sharedWithEmail) {
      await drive.permissions.create({
        fileId: file.id || undefined,
        requestBody: {
          type: "user",
          role: "writer",
          emailAddress: sharedWithEmail,
        },
      });
    }

    // Make the file public if requested
    if (makePublic) {
      await drive.permissions.create({
        fileId: file.id || undefined,
        requestBody: {
          type: "anyone",
          role: "reader",
        },
      });
    }

    return file.webContentLink || null;
  };
};
