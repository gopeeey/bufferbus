import { Readable } from "stream";

export interface FirebaseConfig {
  clientEmail: string;
  privateKey: string;
  projectId: string;
  bucket: string;
}

export interface GoogleCloudStorageConfig {
  bucket: string;
  projectId: string;
  credentials: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    universe_domain: string;
  };
}

interface CreateFirebaseUploaderProps {
  provider: "firebase";
  config: FirebaseConfig;
}

interface CreateGoogleCloudStorageUploaderProps {
  provider: "google-cloud-storage";
  config: GoogleCloudStorageConfig;
}

export type CreateUploaderProps =
  | CreateFirebaseUploaderProps
  | CreateGoogleCloudStorageUploaderProps;

export type UploadFileProps = {
  fileName: string;
  data: Buffer | Readable;
  mimeType?: string;
  public?: boolean;
};
