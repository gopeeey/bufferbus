import dotenv from "dotenv";
import fs from "fs";
import path from "path";
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
    provider: "google-drive",
    config: {
      credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL as string,
        private_key: process.env.GCLOUD_PRIVATE_KEY as string,
        project_id: process.env.GCLOUD_PROJECT_ID as string,
        client_id: process.env.GCLOUD_CLIENT_ID as string,
        private_key_id: process.env.GCLOUD_PRIVATE_KEY_ID as string,
        universe_domain: process.env.GCLOUD_UNIVERSE_DOMAIN as string,
        type: process.env.GCLOUD_TYPE as string,
      },
      sharedWithEmail: process.env.MY_EMAIL as string,
    },
  });

  const file = await uploader({
    data: fs.createReadStream(
      path.join(__dirname, "../../../../Pictures/solar-system.jpg")
    ),
    fileName: "something/solar-system.jpg",
    public: true,
  });

  console.log("\n\n\nFILE URL: ", file);
}

main();

// TODO: Delete the env file and uninstall dotenv
