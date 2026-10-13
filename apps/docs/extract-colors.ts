import fs from 'node:fs';

const outputPath = './colors.ts';
console.log(`Writing to "${outputPath}"...\n`);

try {
  const file = fs.readFileSync('node_modules/@obosbbl/grunnmuren-tailwind/tailwind-base.css');

  // Only the legacy palette, which is plain hex. A `--color-*` that points at a token is a
  // role colour, and the colour page reads those from the tokens instead.
  const legacyColor = /^\s*--color-([\w-]+):\s*(#[\da-f]+);/i;

  const colors = Object.fromEntries(
    file
      .toString()
      .split('\n')
      .flatMap((line) => {
        const match = legacyColor.exec(line);
        return match ? [[match[1], match[2]]] : [];
      }),
  );

  fs.writeFileSync(outputPath, `export default ${JSON.stringify(colors, null, 2)}\n`);
  console.log('\x1b[32m%s\x1b[0m', 'Successfully wrote colors to file!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `\nSomething went wrong: ${error as Error}`);
}

console.log(`Done writing to "${outputPath}"...\n`);
