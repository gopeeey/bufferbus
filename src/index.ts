import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createAzureStorageUploader } from "./azure";
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

    default:
      throw new Error(
        `Unsupported provider. Please provide one of these: ${[
          "firebase",
          "google-cloud-storage",
        ].join(", ")}`
      );
  }
};

async function main() {
  const uploader = createUploader({
    provider: "azure-blob-storage",
    config: {
      storageConnectionString: process.env
        .AZURE_BLOB_STORAGE_CONNECTION_STRING as string,
      containerName: process.env.AZURE_BLOB_STORAGE_CONTAINER_NAME as string,
    },
  });

  const file = await uploader({
    data: fs.createReadStream(
      path.join(__dirname, "../../../../Pictures/solar-system.jpg")
    ),
    fileName: "something-else/news/solar-systemsas.jpg",
    public: true,
    overwriteDuplicate: false,
  });

  console.log("\n\n\nFILE URL: ", file);
}

main();

// TODO: Delete the env file and uninstall dotenv
