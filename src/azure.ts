import { BlockBlobClient } from "@azure/storage-blob";
import { AzureBlobStorageConfig, UploadFileProps } from "./types";
import { makeFileNameUnique, toReadable } from "./utils";

export const createAzureStorageUploader = ({
  storageConnectionString,
  containerName,
}: AzureBlobStorageConfig) => {
  return async ({
    data,
    fileName,
    overwriteDuplicate = true,
  }: UploadFileProps) => {
    if (!overwriteDuplicate) fileName = makeFileNameUnique(fileName);

    const stream = toReadable(data);
    const blobService = new BlockBlobClient(
      storageConnectionString,
      containerName,
      fileName
    );

    // Upload file
    await blobService.uploadStream(stream, undefined, undefined);
    return blobService.url;
  };
};
