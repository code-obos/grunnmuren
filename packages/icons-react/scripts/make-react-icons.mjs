#!/usr/bin/env node
import path from 'node:path';
import { transform } from '@svgr/core';
import fs from 'fs-extra';
import { __dirname, listSvgs } from './utils.mjs';

// Path where SVGs are located
const SVG_PATH = path.join(
  __dirname,
  '../node_modules/@obosbbl/grunnmuren-icons-svg/src',
);

// The path where we write the SVGs as React components.
// The file is temporary, for pre bundling.
const REACT_FILE = path.join(__dirname, '../src/index.tsx');

const files = listSvgs(SVG_PATH);

// Create the React file
fs.outputFileSync(REACT_FILE, '');
fs.appendFile(REACT_FILE, 'import type { SVGProps } from "react";\n');

// biome-ignore lint/complexity/noForEach: leaving this as is in biome migration. Fix when updating this script
files.forEach(async (file) => {
  const jsx = await toReact(file);
  fs.appendFile(REACT_FILE, `${jsx}\n`);
});

// Inline SVGs doesn't need the namespace
// This is the only svgo optimization we perform, as the SVGs are already optimized
const svgoConfig = { plugins: ['removeXMLNS'] };

// We write all the icons to a single file, so we modify the default template to remove all other stuff
// Default template: https://github.com/gregberge/svgr/blob/main/packages/babel-plugin-transform-svg-component/src/defaultTemplate.ts
function reactTemplate(variables, { tpl }) {
  return tpl`
export const ${variables.componentName} = (${variables.props}) => (
    ${variables.jsx}
    );
`;
}

async function toReact(svgFilePath) {
  const svg = await fs.readFile(svgFilePath, 'utf-8');

  const componentName = path.parse(svgFilePath).name;

  const jsx = await transform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      // Setting this to false, as it changes the height/width of the svg
      icon: false,
      svgo: true,
      typescript: true,
      svgProps: {
        role: 'img',
        // If an aria-label is not specified, the icon is automatically hidden from screen readers
        'aria-hidden': '{props["aria-label"] == null}',
      },
      svgoConfig,
      template: reactTemplate,
    },
    { componentName },
  );

  return jsx;
}
