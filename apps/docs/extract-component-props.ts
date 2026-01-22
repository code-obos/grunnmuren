import fs from 'node:fs';
import { marked } from 'marked';
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
  // Ignores all HTMLProps/HTMLAttributes definitions
  'AllHTMLAttributes',
  'HTMLAttributes',
  'DOMAttributes',
  'AriaAttributes',
];

const options: ParserOptions = {
  savePropValueAsString: true,
  propFilter: (prop: PropItem) => {
    switch (true) {
      // remove ref props, as they are considered special
      case prop.name === 'ref':
      // Ignore RAC unstable props in doc
      case prop.name.startsWith('UNSTABLE_'):
      // these are private
      case prop.name.startsWith('~'):
      // key isn't a regular prop, but a special react prop
      case prop.name === 'key':
        return false;
      // check parent ignore list (except for a few special ones which we want to include)
      case prop.parent && !['id', 'children'].includes(prop.name):
        return !ignoreParents.includes(prop.parent.name);
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

// Fix props that have been incorrectly attributed to the wrong parent.
// This seems to happen for components with same prop attributes but different types.
// Where docgen attributes the props to the first matching Props type that it finds.
for (const component of components) {
  const componentBaseName = component.displayName.replace(/^UNSAFE_/, '');

  for (const prop of Object.values(component.props)) {
    if (!prop.parent) continue;

    const parentName = prop.parent.name;

    // Check if this is a component-specific Props type that doesn't match
    if (parentName.endsWith('Props')) {
      const parentBaseName = parentName.replace('Props', '');
      const isMatchingParent =
        parentName.includes(componentBaseName) ||
        componentBaseName.includes(parentBaseName);

      // If the parent doesn't match, use the description from the lookup
      if (!isMatchingParent) {
        prop.description = '';
      }
    }
  }
}

// convert the prop description to HTML instead of markdown
for (const component of components) {
  for (const prop of Object.values(component.props)) {
    if (prop.description) {
      prop.description = await marked.parseInline(prop.description);
    }
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
