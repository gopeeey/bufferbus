export interface FirebaseConfig {
  clientEmail: string;
  privateKey: string;
  projectId: string;
}

export interface GoogleCloudStorageConfig {
  bucketName: string;
  projectId: string;
  keyFilename: string;
  credentials: string;
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
