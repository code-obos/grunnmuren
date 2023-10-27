#!/usr/bin/env node

import { optimize } from 'svgo';
import path from 'path';
import pc from 'picocolors';
import fs from 'fs-extra';
import { __dirname, listSvgs } from './utils.mjs';

const SRC_DIR = path.join(__dirname, '../raw');
const DIST_DIR = path.join(__dirname, '../src');

const ICON_SIZE = '1.25em';

const config = {
  plugins: [
    {
      name: 'convertColors',
      params: {
        currentColor: true,
      },
    },
    // Remove the height/width attributes
    { name: 'removeDimensions' },
    // And add them back with our preferred size
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ width: ICON_SIZE }, { height: ICON_SIZE }],
      },
    },
    {
      name: 'sortAttrs',
    },
  ],
};

const files = listSvgs(SRC_DIR);

files.forEach(async (filePath) => {
  const rawData = await fs.readFile(filePath, 'utf-8');

  const prevFileSize = Buffer.byteLength(rawData, 'utf8');

  const { data: optimizedData } = await optimize(rawData, {
    path: filePath,
    multipass: true,
    ...config,
  });

  const optimizedFileSize = Buffer.byteLength(optimizedData, 'utf8');

  const fileName = path.basename(filePath);

  console.log(`\n${fileName}:`);
  printProfitInfo(prevFileSize, optimizedFileSize);

  const outputPath = path.join(DIST_DIR, fileName);

  fs.outputFile(outputPath, optimizedData, 'utf8');
});

/**
 * Copied from https://github.com/svg/svgo/blob/fdf9236d12b861cee926d7ba3f00284ff7884eab/lib/svgo/coa.js#L512
 */
function printProfitInfo(inBytes, outBytes) {
  var profitPercents = 100 - (outBytes * 100) / inBytes;

  console.log(
    Math.round((inBytes / 1024) * 1000) / 1000 +
      ' KiB' +
      (profitPercents < 0 ? ' + ' : ' - ') +
      pc.green(Math.abs(Math.round(profitPercents * 10) / 10) + '%') +
      ' = ' +
      Math.round((outBytes / 1024) * 1000) / 1000 +
      ' KiB',
  );
}
