import { createFileRoute } from '@tanstack/react-router';
import colors from '../../../../colors';

export const Route = createFileRoute('/_docs/profil/farger')({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: 'Farger - Grunnmuren' },
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
      <div className="grid grid-cols-[repeat(auto-fill,130px)] content-center gap-6">
        {Object.entries(colors).map(([name, value]) => (
          <Color key={name} name={name} value={value} />
        ))}
      </div>
    </>
  );
}

const Color = ({ name, value }) => {
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
      className="grid h-32 w-32 items-end"
    >
      <span className="block p-2 text-sm">{name}</span>
    </div>
  );
};
