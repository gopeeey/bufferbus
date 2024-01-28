import { Storage } from "@google-cloud/storage";
import { GoogleCloudStorageConfig, UploadFileProps } from "./types";
import { toReadable } from "./utils";

export const createGoogleCloudStorageUploader = ({
  projectId,
  credentials,
  bucket: storageBucket,
}: GoogleCloudStorageConfig) => {
  const storage = new Storage({
    projectId,
    credentials,
  });

  return async ({
    fileName,
    data,
    mimeType,
    public: makePublic = true,
  }: UploadFileProps) => {
    const bucket = storage.bucket(storageBucket);
    const stream = toReadable(data);
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
