import fs from 'node:fs';
import { withDefaultConfig } from 'react-docgen-typescript';

const options = {
  savePropValueAsString: true,
};

const docs = withDefaultConfig({
  ...options,
  componentNameResolver: (exp, source) => {
    // Rename DisclosureGroup from grunnmuren-react to avoid name collision with react-aria-components.
    // Docgen is not able to resolve the props for DisclosureGroup in our reexported component from react-aria-components.
    // This seems to be because there is no way for docgen to connect DisclosureGroup to DisclosureGroupProps,
    // since there is no function or class named DisclosureGroup that takes DisclosureGroupProps as an argument.
    if (
      exp.getName() === 'DisclosureGroup' &&
      !source.fileName.includes('react-aria-components')
    ) {
      return 'InternalDisclosureGroup';
    }

    // Avvoid duplicate component names, since these are both exported from react-aria-components and grunnmuren-react
    if (
      exp.getName() === 'DisclosurePanel' &&
      source.fileName.includes('react-aria-components')
    ) {
      return 'RACDisclosurePanel';
    }

    if (
      exp.getName() === 'Disclosure' &&
      source.fileName.includes('react-aria-components')
    ) {
      return 'RACDisclosure';
    }

    return;
  },
}).parse([
  './node_modules/@obosbbl/grunnmuren-react/src/index.ts',
  // We reexport DisclosureGroup from react-aria-components in grunnmuren-react, so we need to parse it to get the props
  './node_modules/@obosbbl/grunnmuren-react/node_modules/react-aria-components/src/Disclosure.tsx',
]);

const outputPath = './docgen.ts';
console.log(`Writing props to "${outputPath}"...\n`);

let withoutError = true;

try {
  fs.writeFileSync(
    outputPath,
    Object.values(docs)
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
