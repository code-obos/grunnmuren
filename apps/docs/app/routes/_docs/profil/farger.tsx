import { useLayoutEffect } from '@react-aria/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_docs/profil/farger')({
  component: RouteComponent,
});

/**
 * Retrieves all colors from the CSS variables in the document.
 * @returns a record of all colors
 */
function getAllColors() {
  const cssVariables: Record<string, string> = {};

  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules ?? []) {
      if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
        for (const style of rule.style) {
          const prefix = '--gm-color-';
          if (style.startsWith('--gm-color-')) {
            cssVariables[style.replace(prefix, '')] = rule.style
              .getPropertyValue(style)
              .trim();
          }
        }
      }
    }
  }

  return cssVariables;
}

function RouteComponent() {
  const [colors, setColors] = useState<null | {
    [key: string]: string;
  }>(null);

  // Make sure to read the colors from the custom properties when the component mounts client side
  useLayoutEffect(() => {
    setColors(getAllColors());
  }, []);

  if (!colors) {
    // Return null if the colors are not loaded yet (usually this will only happen on the server)
    return null;
  }

  return (
    <>
      <h1 className="heading-l my-12">Farger</h1>
      <div className="prose mb-12">
        <p>Grunnmuren har {Object.keys(colors).length} forskjellige farger.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,130px)] content-center gap-6">
        {Object.entries(colors).map(([name, value]) => (
          <Color key={name} name={name} value={value} />
        ))}
      </div>
    </>
  );
}

const Color = ({ name, value }) => {
  const color = `rgb(${value.split(' ').join(', ')})`;

  return (
    <div
      style={{
        backgroundColor: color,
        // Makes sure the text has enough contrast by calculating the color based on the background color
        // This will yield a color that is either black or white
        // Refer to: https://til.jakelazaroff.com/css/swap-between-black-and-white-text-based-on-background-color/
        color: `lch(from ${color} calc((54 - l) * infinity) 0 0)`,
        border:
          name === 'white' ? '1px solid rgb(var(--gm-color-blue-dark))' : '',
      }}
      className="grid h-32 w-32 items-end"
    >
      <span className="block p-2 text-sm">{name}</span>
    </div>
  );
};
