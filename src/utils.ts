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
