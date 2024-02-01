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

export interface AwsS3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  bucketSupportsAccessControlList: boolean;
  queueSize?: number;
  partSize?: number;
  leavePartsOnError?: boolean;
}

interface CreateFirebaseUploaderProps {
  platform: "firebase";
  config: FirebaseConfig;
}

interface CreateGoogleCloudStorageUploaderProps {
  platform: "google-cloud-storage";
  config: GoogleCloudStorageConfig;
}

interface CreateGoogleDriveUploaderProps {
  platform: "google-drive";
  config: GoogleDriveConfig;
}

interface CreateAzureBlobStorageUploaderProps {
  platform: "azure-blob-storage";
  config: AzureBlobStorageConfig;
}

interface CreateAwsS3UploaderProps {
  platform: "aws-s3";
  config: AwsS3Config;
}

export type CreateUploaderProps =
  | CreateFirebaseUploaderProps
  | CreateGoogleCloudStorageUploaderProps
  | CreateGoogleDriveUploaderProps
  | CreateAzureBlobStorageUploaderProps
  | CreateAwsS3UploaderProps;

export type UploadFileProps = {
  fileName: string;
  data: Buffer | Readable;
  mimeType?: string;
  public?: boolean;
  overwriteDuplicate?: boolean;
};

export type UploaderCreator = (
  props: CreateUploaderProps["config"]
) => (uploadProps: UploadFileProps) => Promise<string | null>;
