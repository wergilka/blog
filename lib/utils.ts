import fs from "fs";
import { resolve } from "path";
import { DecoderFunction, Pojo } from "typescript-json-decoder";

/** Return a flat array of all files under given directory */
export function getFilesRecursively(dir: string): string[] {
  let found: string[] = [];
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const path = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      found = found.concat(getFilesRecursively(path));
    } else {
      found.push(path);
    }
  }
  return found;
}

/** Try a decoder and return a default value in case it fails */
export const withDefault = <T>(
  decoder: DecoderFunction<T>,
  defaultValue: T
) => {
  return (value: Pojo) => {
    try {
      return decoder(value);
    } catch (_) {
      return defaultValue;
    }
  };
};