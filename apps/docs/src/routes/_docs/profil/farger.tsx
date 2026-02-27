import { Check } from '@obosbbl/grunnmuren-icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { cx } from 'cva';
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
  return (
    <>
      <h1 className="heading-l my-12">Farger</h1>
      <div className="prose mb-12">
        <p>Grunnmuren har {Object.keys(colors).length} forskjellige farger.</p>
      </div>
      <div className="flex max-w-5xl flex-wrap gap-6">
        {Object.entries(colors).map(([name, value]) => (
          <Color key={name} name={name} value={value} />
        ))}
      </div>
    </>
  );
}

const Color = ({ name, value }: { name: string; value: string }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const variableName = `--color-${name}`;

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div
      style={{
        backgroundColor: value,
        // Makes sure the text has enough contrast by calculating the color based on the background color
        // This will yield a color that is either black or white
        // Refer to: https://til.jakelazaroff.com/css/swap-between-black-and-white-text-based-on-background-color/
        color: `lch(from ${value} calc((54 - l) * infinity) 0 0)`,
        border: name === 'white' ? '1px solid var(--color-blue-dark)' : '',
      }}
      className="grid h-37 w-37 shrink-0 content-end font-medium"
    >
      <CopyButton
        onClick={() => copyToClipboard(value, 'hex')}
        copied={copiedField === 'hex'}
        label={`Kopier hex-kode ${value}`}
      >
        {value}
      </CopyButton>
      <CopyButton
        onClick={() => copyToClipboard(name, 'name')}
        copied={copiedField === 'name'}
        label={`Kopier fargenavn ${name}`}
      >
        {name}
      </CopyButton>
      <CopyButton
        onClick={() => copyToClipboard(variableName, 'variable')}
        copied={copiedField === 'variable'}
        label={`Kopier variabelnavn ${variableName}`}
      >
        {variableName}
      </CopyButton>
    </div>
  );
};

const CopyButton = ({
  onClick,
  copied,
  label,
  children,
}: {
  onClick: () => void;
  copied: boolean;
  label: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="relative cursor-copy px-2 py-1 text-left text-sm hover:underline focus-visible:outline-current focus-visible:outline-focus-inset"
  >
    <span className={cx(copied && 'invisible')}>{children}</span>
    <span
      className={cx(
        'pointer-events-none absolute inset-0 inline-flex items-center gap-1 px-2',
        !copied && 'invisible',
      )}
    >
      <Check className="size-4" />
      Kopiert!
    </span>
  </button>
);
