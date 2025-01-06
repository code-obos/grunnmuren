import fs from 'node:fs';
import { withDefaultConfig } from 'react-docgen-typescript';

const options = {
  savePropValueAsString: true,
};

const docs = withDefaultConfig().parse(
  './node_modules/@obosbbl/grunnmuren-react/src/index.ts',
  options,
);

const outputPath = './docgen.ts';
console.log(`Writing props to "${outputPath}"...\n`);

let withoutError = true;

try {
  fs.writeFileSync(
    outputPath,
    Object.values(docs)
      .map((prop) => {
        const prettifiedName = prop.displayName.replace('_', '');
        return `export const ${prettifiedName} = ${JSON.stringify({ ...prop, displayName: prettifiedName }, null, 2)}`;
      })
      .join('\n'),
  );
} catch (error) {
  withoutError = false;
  console.error('\x1b[31m%s\x1b[0m', `\nSomething went wrong: ${error}`);
}

if (withoutError) {
  console.log('\x1b[32m%s\x1b[0m', '\n✔ Done!');
}
