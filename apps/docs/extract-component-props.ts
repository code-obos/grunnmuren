import fs from 'node:fs';
import {
  type ParserOptions,
  type PropItem,
  withDefaultConfig,
} from 'react-docgen-typescript';

const ignoreParents = [
  'DOMProps',
  'GlobalDOMEvents',
  'GlobalDOMAttributes',
  // Ignore for now. Do we support slots in the react aria way?
  'SlotProps',
];

const options: ParserOptions = {
  savePropValueAsString: true,
  propFilter: (prop: PropItem) => {
    switch (true) {
      case prop.parent && prop.name !== 'id':
        return !ignoreParents.includes(prop.parent.name);
      // remove ref props, as they are considered special
      case prop.name === 'ref':
        return false;
      default:
        return true;
    }
  },
};

const components = withDefaultConfig({
  ...options,
}).parse(['./node_modules/@obosbbl/grunnmuren-react/src/index.ts']);

// see re-exports-props.ts
const propFixes = withDefaultConfig({
  ...options,
}).parse(['./re-exports-props.ts']);

for (const componentToFix of Object.values(propFixes)) {
  const toUpdate = components.find(
    (c) => c.displayName === componentToFix.displayName,
  );

  if (toUpdate) {
    toUpdate.props = componentToFix.props;
  }
}

const outputPath = './component-props.ts';
console.log(`Writing props to "${outputPath}"...\n`);

let withoutError = true;

try {
  fs.writeFileSync(
    outputPath,
    Object.values(components)
      .map((prop) => {
        const prettifiedName = prop.displayName.replace('_', '');
        const output = `export const ${prettifiedName} = ${JSON.stringify({ ...prop, displayName: prettifiedName }, null, 2)}`;

        // Quick fix to also expose ListBoxItem, ListBoxSection and ListBoxHeader as ComboboxItem, ComboboxSection, ComboboxHeader, SelectItem, SelectSection and SelectHeader
        if (prettifiedName.startsWith('ListBox')) {
          return `${output}
          export const ${prettifiedName.replace('ListBox', 'Combobox')} = ${JSON.stringify({ ...prop, displayName: prettifiedName }, null, 2)}
          export const ${prettifiedName.replace('ListBox', 'Select')} = ${JSON.stringify({ ...prop, displayName: prettifiedName }, null, 2)}
          `;
        }

        return output;
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
