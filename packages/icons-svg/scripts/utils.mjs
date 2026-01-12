import { globSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assumes the folder only contains SVGs. Poor man's glob
export function listSvgs() {
  const files = globSync('raw/**/*.svg', { absolute: true });

  return files;
}
