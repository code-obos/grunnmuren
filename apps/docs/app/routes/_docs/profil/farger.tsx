import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_docs/profil/farger')({
  component: RouteComponent,
});

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
  const colors = getAllColors();

  return (
    <>
      <h1 className="heading-l mb-12 mt-9">Farger</h1>
      <div className="prose mb-12">
        <p>Grunnmuren har {Object.keys(colors).length} forskjellige farger.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,_130px)] content-center gap-6">
        {Object.entries(colors).map(([name, value]) => (
          <Color key={name} name={name} value={value} />
        ))}
      </div>
    </>
  );
}

const Color = ({ name, value }) => (
  <div
    style={{
      backgroundColor: value,
      // Makes sure the text has enough contrast by calculating the color based on the background color
      // This will yield a color that is either black or white
      // Refer to: https://til.jakelazaroff.com/css/swap-between-black-and-white-text-based-on-background-color/
      color: `lch(from ${value} calc((54 - l) * infinity) 0 0)`,
      border: value === '#fff' ? '1px solid var(--gm-color-blue-dark)' : '',
    }}
    className="grid h-32 w-32 items-end"
  >
    <span className="block p-2 text-sm">{name}</span>
  </div>
);
