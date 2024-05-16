import { Glob } from 'bun';
import { readMetrics, generateFontFace } from 'fontaine';

const fontGlob = new Glob('*.woff2');

for await (const fontFile of fontGlob.scan({
  absolute: true,
})) {
  const fontMetrics = await readMetrics('file://' + fontFile);

  if (fontMetrics == null) {
    throw new Error('Unable to read metrics for ' + fontFile);
  }
  console.log(fontFile, fontMetrics);

  /**
  @font-face {
    font-family: "__OBOSFont_Fallback";
    src: local("Arial");
    size-adjust: 100%;
    ascent-override: 94%;
    descent-override: 26%;
    line-gap-override: 0%;
  }
   */
  const fontFaceDeclaration = generateFontFace(fontMetrics, {
    name: '__OBOSFont_Fallback',
    font: 'Arial',
  });

  const lines = fontFaceDeclaration.split('\n');

  // Remove the first and last line, leaving us with the "rules"
  // of the declaration instead of the declaration itself.
  const rules = lines.slice(1, -2);

  const obj = {};

  for (const rule of rules) {
    let [property, value] = rule.split(':').map((v) => v.trim());
    value = value.slice(0, -1);

    obj[property] = value;
  }

  console.log(obj);

  await Bun.write(
    './font-fallback.js',
    `module.exports = ${JSON.stringify(obj)}`,
  );
}
