import * as firebaseAdmin from "firebase-admin";
import { Readable } from "stream";
import { FirebaseConfig, UploadFileProps } from "./types";
import { makeFileNameUnique, toReadable } from "./utils";

export const createFirebaseUploader = ({
  clientEmail,
  privateKey,
  projectId,
  bucket: storageBucket,
}: FirebaseConfig) => {
  const app = firebaseAdmin.initializeApp(
    {
      credential: firebaseAdmin.credential.cert({
        clientEmail,
        privateKey,
        projectId,
      }),
      storageBucket,
    },
    "bufferbus-firebase-uploader"
  );

  return ({
    fileName,
    data,
    mimeType,
    public: makePublic = true,
    overwriteDuplicate = true,
  }: UploadFileProps) => {
    if (!overwriteDuplicate) fileName = makeFileNameUnique(fileName);
    const bucket = app.storage().bucket();
    let stream: Readable = toReadable(data);
    const file = bucket.file(fileName);

    const uploadStream = file.createWriteStream({
      contentType: mimeType || "application/octet-stream",
      public: makePublic,
    });

    const prom = new Promise<string | null>((res, rej) => {
      uploadStream.on("finish", async () => {
        const url = makePublic ? file.publicUrl() : null;
        res(url);
      });

      uploadStream.on("error", (err) => {
        rej(err);
      });
    });

    stream.pipe(uploadStream);
    return prom;
  };
};
