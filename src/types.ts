export interface FirebaseConfigInterface {
  clientEmail: string;
  privateKey: string;
  projectId: string;
}

export interface GoogleCloudStorageConfigInterface {
  bucketName: string;
  projectId: string;
  keyFilename: string;
  credentials: string;
}

export interface CreateFirebaseUploaderProps {
  provider: "firebase";
  config: FirebaseConfigInterface;
}

export interface CreateGoogleCloudStorageUploaderProps {
  provider: "google-cloud-storage";
  config: GoogleCloudStorageConfigInterface;
}

export type CreateUploaderProps =
  | CreateFirebaseUploaderProps
  | CreateGoogleCloudStorageUploaderProps;
