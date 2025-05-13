import fs from 'node:fs';

const outputPath = './colors.ts';
console.log(`Writing to "${outputPath}"...\n`);

try {
  const file = fs.readFileSync(
    'node_modules/@obosbbl/grunnmuren-tailwind/tailwind-base.css',
  );

  const colorVarPrefix = '--color-';

  const colors = Object.fromEntries(
    file
      .toString()
      .split('\n')
      .filter((line) => line.includes(colorVarPrefix))
      .map((line) => {
        const [name, value] = line.split(':');
        return [
          name.replace(colorVarPrefix, '').trim(),
          value.replace(';', '').trim(),
        ];
      }),
  );

  fs.writeFileSync(
    outputPath,
    `export default ${JSON.stringify(colors, null, 2)}\n`,
  );
  console.log('\x1b[32m%s\x1b[0m', 'Successfully wrote colors to file!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `\nSomething went wrong: ${error}`);
}

console.log(`Done writing to "${outputPath}"...\n`);
