import { Glob } from 'bun';
import { readMetrics, generateFontFace } from 'fontaine';

/**
 * This script parses all the OBOSText fonts and generates
 * a local font fallback to reduce CLS. It is in similar vein
 * to next/font, but uses fontaine instead.
 *
 * The script is written in Bun because of built in TS and glob support.
 * The output of the file is loaded as a font declaration in the Tailwind preset.
 *
 * Even though we parse several font files, and the metrics are somewhat different
 * between them, they all result in an equal font declaration.
 *
 */

const fontGlob = new Glob('*.woff2');

for await (const fontFile of fontGlob.scan({
  absolute: true,
})) {
  const fontMetrics = await readMetrics('file://' + fontFile);

  if (fontMetrics == null) {
    throw new Error('Unable to read metrics for ' + fontFile);
  }
  console.log(fontFile, fontMetrics);

  const fontFaceDeclaration = generateFontFace(fontMetrics, {
    name: '__OBOSText_Fallback',
    font: 'Arial',
  });

  /**
   * The output from generateFontFace is a string like this:
  @font-face {
    font-family: "__OBOSText_Fallback";
    src: local("Arial");
    size-adjust: 100%;
    ascent-override: 94%;
    descent-override: 26%;
    line-gap-override: 0%;
  }
    Remove the first and last line from the string, stripping away the font
    face declaration, and leaving us only with the actual css rules for the font
   */
  const lines = fontFaceDeclaration.split('\n');
  const rules = lines.slice(1, -2);

  const obj: Record<string, string> = {};

  for (const rule of rules) {
    // eslint-disable-next-line prefer-const
    let [cssProperty, cssValue] = rule.split(':').map((v) => v.trim());
    cssValue = cssValue.slice(0, -1);

    obj[cssProperty] = cssValue;
  }

  console.log(obj);

  await Bun.write(
    './font-fallback.js',
    `module.exports = ${JSON.stringify(obj)}`,
  );
}
