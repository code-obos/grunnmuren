import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export const iconsPath = path.join(__dirname, 'svg');
