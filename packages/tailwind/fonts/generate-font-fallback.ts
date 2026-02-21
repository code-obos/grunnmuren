import { Glob } from 'bun';
import { generateFontFace, readMetrics } from 'fontaine';

/**
 * This script parses all the OBOS fonts and generates
 * local fonts fallback to reduce CLS. It is in similar vein
 * to next/font, but uses fontaine instead.
 *
 * The script is written in Bun because of built in TS and glob support.
 * The output of the file is loaded as a font declaration in the Tailwind preset.
 *
 * The fonts are grouped by their family and parsed. Even though we parse several font files,
 * and the metrics are somewhat different between fonts in the same family, they should all
 * result in an equal font declaration. The console logging is useful debugging to make sure that is true.
 *
 */

const fontGlob = new Glob('*.woff2');

// Get all font files in the folder and group them by their family name
const fontFiles = await Array.fromAsync(fontGlob.scan());
const fontFilesByFamily = Object.groupBy(
  fontFiles,
  (file) => file.split('-')[0],
);

const fontFallbacks: Record<string, unknown> = {};

for (const [fontFamilyName, fontFiles] of Object.entries(fontFilesByFamily)) {
  for (const fontFile of fontFiles ?? []) {
    const fontMetrics = await readMetrics(Bun.pathToFileURL(fontFile));

    if (fontMetrics == null) {
      throw new Error(`Unable to read metrics for ${fontFile}`);
    }
    console.log(fontFile, fontMetrics);

    const fontFaceDeclaration = generateFontFace(fontMetrics, {
      name: `__${fontFamilyName}_Fallback`,
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

    const fontFallbackDeclaration: Record<string, string> = {};

    for (const rule of rules) {
      const [cssProperty, cssValue] = rule
        .split(':')
        .map((v) => v.trim().replace(';', ''));
      fontFallbackDeclaration[cssProperty] = cssValue;
    }

    fontFallbacks[fontFamilyName] = fontFallbackDeclaration;
  }
}

// Generate CSS content with @layer base and @theme
let cssContent = '@layer base {\n';

// Add all font-face declarations inside the @layer base
for (const [_, fallback] of Object.entries(fontFallbacks)) {
  cssContent += '  @font-face {\n';

  // Add all CSS properties
  for (const [property, value] of Object.entries(
    fallback as Record<string, string>,
  )) {
    cssContent += `    ${property}: ${value};\n`;
  }

  cssContent += '  }\n\n';
}

cssContent += '}\n\n';

// Write to ../font.css
await Bun.write('../font.css', cssContent);
