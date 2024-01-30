import { Readable } from "stream";

export interface FirebaseConfig {
  clientEmail: string;
  privateKey: string;
  projectId: string;
  bucket: string;
}

type GoogleCredentials = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  universe_domain: string;
};

export interface GoogleCloudStorageConfig {
  bucket: string;
  projectId: string;
  credentials: GoogleCredentials;
}

export interface GoogleDriveConfig {
  credentials: GoogleCredentials;
  sharedWithEmail?: string;
}

export interface AzureBlobStorageConfig {
  storageConnectionString: string;
  containerName: string;
}

interface CreateFirebaseUploaderProps {
  provider: "firebase";
  config: FirebaseConfig;
}

interface CreateGoogleCloudStorageUploaderProps {
  provider: "google-cloud-storage";
  config: GoogleCloudStorageConfig;
}

interface CreateGoogleDriveUploaderProps {
  provider: "google-drive";
  config: GoogleDriveConfig;
}

interface CreateAzureBlobStorageUploaderProps {
  provider: "azure-blob-storage";
  config: AzureBlobStorageConfig;
}

export type CreateUploaderProps =
  | CreateFirebaseUploaderProps
  | CreateGoogleCloudStorageUploaderProps
  | CreateGoogleDriveUploaderProps
  | CreateAzureBlobStorageUploaderProps;

export type UploadFileProps = {
  fileName: string;
  data: Buffer | Readable;
  mimeType?: string;
  public?: boolean;
  overwriteDuplicate?: boolean;
};
