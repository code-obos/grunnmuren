import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assumes the folder only contains SVGs. Poor man's glob
export function listSvgs(dirPath) {
  const files = fs.readdirSync(dirPath);

  return files.map((file) => path.join(dirPath, file));
}
