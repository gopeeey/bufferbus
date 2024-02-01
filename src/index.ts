import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createAwsS3Uploader } from "./aws-s3";
import { createAzureStorageUploader } from "./azure-blob-storage";
import { createFirebaseUploader } from "./firebase";
import { createGoogleCloudStorageUploader } from "./google-cloud-storage";
import { createGoogleDriveUploader } from "./google-drive";
import { CreateUploaderProps } from "./types";

dotenv.config();

export const createUploader = (props: CreateUploaderProps) => {
  switch (props.provider) {
    case "firebase":
      return createFirebaseUploader(props.config);

    case "google-cloud-storage":
      return createGoogleCloudStorageUploader(props.config);

    case "google-drive":
      return createGoogleDriveUploader(props.config);

    case "azure-blob-storage":
      return createAzureStorageUploader(props.config);

    case "aws-s3":
      return createAwsS3Uploader(props.config);

    default:
      throw new Error(
        `Unsupported provider. Please provide one of these: ${[
          "firebase",
          "google-cloud-storage",
          "google-drive",
          "azure-blob-storage",
          "aws-s3",
        ].join(", ")}`
      );
  }
};

async function main() {
  const uploader = createUploader({
    provider: "aws-s3",
    config: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      bucket: process.env.AWS_S3_BUCKET as string,
      region: process.env.AWS_S3_REGION as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      bucketSupportsAccessControlList: false,
    },
  });

  const file = await uploader({
    data: fs.createReadStream(
      path.join(__dirname, "../../../../Pictures/solar-system.jpg")
    ),
    fileName: "something-else/news/solar-systemsas.jpg",
    public: true,
    overwriteDuplicate: true,
  });

  console.log("\n\n\nFILE URL: ", file);
}

main();

// TODO: Delete the env file and uninstall dotenv
