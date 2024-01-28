import * as firebaseAdmin from "firebase-admin";
import { Readable } from "stream";
import { FirebaseConfig, UploadFileProps } from "./types";
import { toReadable } from "./utils";

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

  return ({ fileName, data }: UploadFileProps) => {
    const bucket = app.storage().bucket();
    let stream: Readable = toReadable(data);

    const uploadStream = bucket.file(fileName).createWriteStream({
      contentType: "application/octet-stream",
    });

    const prom = new Promise<string>((res) => {
      uploadStream.on("close", async () => {
        await bucket.file(fileName).makePublic();
        const url = bucket.file(fileName).publicUrl();
        res(url);
      });
    });

    stream.pipe(uploadStream);
    return prom;
  };
};
