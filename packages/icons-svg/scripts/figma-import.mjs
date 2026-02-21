#!/usr/bin/env node
import path from 'node:path';
import fs from 'fs-extra';
import ora from 'ora';
import prompts from 'prompts';
import { __dirname } from './utils.mjs';

// The Figma project where we can find our icons
// https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/
const FIGMA_PROJECT_ID = '9OvSg0ZXI5E1eQYi7AWiWn';

// The id the of the node where we can find the icons
// https://www.figma.com/file/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?type=design&node-id=30-2099
const NODE_ID = '30:2099';

// Where we store the Figma token
const FIGMA_TOKEN_PATH = path.join(__dirname, '../', '.FIGMA_TOKEN');

(async function main() {
  const spinner = ora(
    `Reading Figma access token from ${FIGMA_TOKEN_PATH}`,
  ).start();

  let figmaToken = await readTokenFromDisk();

  if (figmaToken) {
    spinner.succeed(`Using Figma access token from ${FIGMA_TOKEN_PATH}`);
  } else {
    spinner.warn('No Figma access token found');

    const tokenPrompt = await prompts({
      type: 'text',
      name: 'figmaToken',
      message:
        'Enter your Figma access token (https://www.figma.com/developers/api#access-tokens)',
    });

    figmaToken = tokenPrompt.figmaToken;

    const { saveToken } = await prompts({
      type: 'confirm',
      name: 'saveToken',
      message: 'Would you like to save the token?',
    });

    if (saveToken) {
      await writeTokenToDisk(figmaToken);
      spinner.succeed(`Saved token to ${FIGMA_TOKEN_PATH}`);
    }
  }

  spinner.start('Loading Figma project');

  let components;
  try {
    components = await fetchComponents(figmaToken);
    spinner.succeed('Loaded Figma components');
  } catch (e) {
    spinner.fail(`Unable to load Figma components: ${e.message}`);
    return;
  }

  let icons;
  try {
    spinner.start('Parsing Figma components');
    icons = processComponents(components);
    spinner.succeed(`Parsed ${icons.length} components into icons`);
  } catch (e) {
    spinner.fail(`Unable to parse icons from Figma components: ${e.message}`);
    return;
  }

  let urls;
  try {
    spinner.start(`Found ${icons.length} icons. Getting download URLs`);
    urls = await fetchImageUrls(icons, figmaToken);
    spinner.succeed();
  } catch (e) {
    spinner.fail(`Unable to get icon URLs: ${e.message}`);
    return;
  }

  let count = 0;
  spinner.start(`Downloading icons: ${count}/${icons.length}`);

  await Promise.all(
    Object.entries(urls.images).map(async ([id, url]) => {
      const iconName = icons.find((i) => i.id === id).name;

      await downloadSvgIcon({ iconName, url });

      count = count + 1;
      spinner.text = `Downloading icons: ${count}/${icons.length}`;
    }),
  );

  spinner.succeed();

  spinner.succeed(`Sucessfully downloaded ${icons.length} icons!`);
})();

async function fetchComponents(figmaToken) {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_PROJECT_ID}/nodes?ids=${NODE_ID}`,
    {
      headers: {
        'X-FIGMA-TOKEN': figmaToken,
      },
    },
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.err);
  }

  return json.nodes[NODE_ID].document.children;
}

/**
 * Get image URLs for the icons
 *
 * @returns { images: {[id]: string}};
 */
async function fetchImageUrls(icons, figmaToken) {
  const url = new URL(`https://api.figma.com/v1/images/${FIGMA_PROJECT_ID}/`);

  url.searchParams.set('ids', icons.map((i) => i.id).join(','));
  url.searchParams.set('format', 'svg');

  const res = await fetch(url, {
    headers: {
      'X-FIGMA-TOKEN': figmaToken,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.err);
  }

  return json;
}

/**
 * Get the SVG icon
 */
async function downloadSvgIcon({ iconName, url }) {
  const res = await fetch(url);
  const svg = await res.text();

  const path = `${__dirname}/../raw/${iconName}.svg`;

  return fs.outputFile(path, svg, 'utf8');
}

/**
 * Get the icons in the Figma Project
 *
 * @returns Array<{id: string, name: string}>
 */
function processComponents(components) {
  return components.map((i) => ({
    // Previously we exported the icon without any built in padding by getting the child of the icon node as such
    // id: i.children[0].id,
    id: i.id,
    name: i.name,
  }));
}

function writeTokenToDisk(token) {
  return fs.outputFile(FIGMA_TOKEN_PATH, token, 'utf8');
}

/**
 * @returns {Promise<String>} token
 */
async function readTokenFromDisk() {
  try {
    const token = await fs.readFile(FIGMA_TOKEN_PATH, 'utf8');
    return token;
  } catch {
    return '';
  }
}
