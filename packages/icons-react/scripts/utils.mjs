import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assumes the folder only contains SVGs. Poor man's glob
export function listSvgs(dirPath) {
  const files = fs.readdirSync(dirPath);

  return files.map((file) => path.join(dirPath, file));
}
