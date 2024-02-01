import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { AwsS3Config, UploadFileProps } from "./types";
import { makeFileNameUnique, toReadable } from "./utils";

export const createAwsS3Uploader = (props: AwsS3Config) => {
  const client = new S3Client({
    credentials: {
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretAccessKey,
    },
    region: props.region,
  });

  return async ({
    data,
    fileName,
    mimeType = "application/octet-stream",
    overwriteDuplicate = true,
    public: makePublic = true,
  }: UploadFileProps) => {
    if (!overwriteDuplicate) fileName = makeFileNameUnique(fileName);

    const stream = toReadable(data);
    const res = await new Upload({
      client,
      params: {
        Bucket: props.bucket,
        Key: fileName,
        Body: stream,
        ContentType: mimeType,
        ...(props.bucketSupportsAccessControlList
          ? { ACL: makePublic ? "public-read" : "private" }
          : {}),
      },
      queueSize: props.queueSize || undefined,
      partSize: props.partSize || undefined,
      leavePartsOnError: props.leavePartsOnError || undefined,
    }).done();

    return res.Location || null;
  };
};
