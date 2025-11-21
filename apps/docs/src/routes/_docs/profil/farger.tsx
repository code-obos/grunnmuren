'use client';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import colors from '../../../../colors';

export const Route = createFileRoute('/_docs/profil/farger')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Farger | Grunnmuren' },
      { name: 'description', content: 'Grunnmuren sine farger' },
    ],
  }),
});

function RouteComponent() {
  const [selectedColor, setSelectedColor] = useState<string>('');
  return (
    <>
      <h1 className="heading-l my-12">Farger</h1>
      <div className="prose mb-12">
        <p>Grunnmuren har {Object.keys(colors).length} forskjellige farger.</p>
        <p>
          Klikk på en farge for å kopiere CSS-variabelen til utklippstavlen
          (eksempel: <i>var(--color-mint-lightest)</i>)
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,130px)] content-center gap-6">
        {Object.entries(colors).map(([name, value]) => (
          <Color
            key={name}
            name={name}
            value={value}
            selected={selectedColor}
            onClick={() => setSelectedColor(name)}
          />
        ))}
      </div>
    </>
  );
}

const Color = ({ name, value, selected, onClick }) => {
  function handleCopy() {
    void navigator.clipboard.writeText(`var(--${name})`);
    onClick();
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      title={`Kopier var(--${name}) til utklippstavlen`}
      style={{
        backgroundColor: value,
        // Makes sure the text has enough contrast by calculating the color based on the background color
        // This will yield a color that is either black or white
        // Refer to: https://til.jakelazaroff.com/css/swap-between-black-and-white-text-based-on-background-color/
        color: `lch(from ${value} calc((54 - l) * infinity) 0 0)`,
        border: name === 'white' ? '1px solid var(--color-blue-dark)' : '',
        cursor: 'copy',
      }}
      className="grid h-32 w-32 items-end"
    >
      <div className="flex items-end justify-between p-2">
        <span className="block text-sm">
          {name} {name === selected && '✅'}
        </span>
      </div>
    </button>
  );
};
