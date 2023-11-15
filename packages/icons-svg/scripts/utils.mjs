import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Assumes the folder only contains SVGs. Poor man's glob
export function listSvgs() {
  const files = globSync('raw/**/*.svg', { absolute: true });

  return files;
}
