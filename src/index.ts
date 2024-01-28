import dotenv from "dotenv";
import { createFirebaseUploader } from "./firebase";
import { CreateUploaderProps } from "./types";

dotenv.config();

export const createUploader = (props: CreateUploaderProps) => {
  switch (props.provider) {
    case "firebase":
      return createFirebaseUploader(props.config);
    default:
      throw new Error(
        `Unsupported provider. Please provide one of these: ${[
          "firebase",
          "google-cloud-storage",
        ].join(", ")}`
      );
  }
};

// TODO: Delete the env file and uninstall dotenv
