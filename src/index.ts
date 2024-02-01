import { createAwsS3Uploader } from "./aws-s3";
import { createAzureStorageUploader } from "./azure-blob-storage";
import { createFirebaseUploader } from "./firebase";
import { createGoogleCloudStorageUploader } from "./google-cloud-storage";
import { createGoogleDriveUploader } from "./google-drive";
import { CreateUploaderProps } from "./types";

const platformKeys: CreateUploaderProps["platform"][] = [
  "firebase",
  "google-cloud-storage",
  "google-drive",
  "azure-blob-storage",
  "aws-s3",
] as const;

export const createUploader = (props: CreateUploaderProps) => {
  switch (props.platform) {
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
        `Unsupported platform. Please provide one of these: ${platformKeys.join(
          ", "
        )}`
      );
  }
};
