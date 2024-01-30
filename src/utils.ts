import { nanoid } from "nanoid";
import { Readable } from "stream";

export const bufferToReadable = (data: Buffer) => {
  const stream = new Readable();
  stream._read = () => {
    stream.push(data);
    stream.push(null);
  };
  return stream;
};

export const toReadable = (data: Buffer | Readable) => {
  if (data instanceof Readable) return data;
  return bufferToReadable(data);
};

export const splitToNameAndExtension = (fileName: string) => {
  const parts = fileName.split(".");
  return [
    parts.slice(0, parts.length - 1).join("."),
    parts[parts.length - 1],
  ] as const;
};

export const makeFileNameUnique = (fileName: string) => {
  const [name, extension] = splitToNameAndExtension(fileName);
  const uniqueFileName = `${name}-${Date.now()}-${nanoid(36)}.${extension}`;
  return uniqueFileName;
};
