import { Glob } from 'bun';
import { readMetrics, generateFontFace, getMetricsForFamily } from 'fontaine';

const fontGlob = new Glob('*.woff2');

for await (const fontFile of fontGlob.scan({
  cwd: './fonts',
  absolute: true,
})) {
  const fontMetrics = await readMetrics('file://' + fontFile);

  const fontFace = generateFontFace(fontMetrics, {
    name: '__OBOSFont_Fallback',
    font: 'Arial',
  });
  console.log(fontFace);
}
