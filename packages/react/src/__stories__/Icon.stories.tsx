import * as icons from '@obosbbl/grunnmuren-icons';

export default {
  title: 'Icons',
  parameters: {
    layout: 'padded',
  },
};

export function Icons() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_100px)] content-center justify-center gap-6">
      {Object.values(icons).map((Icon) => (
        <div key={Icon.name}>
          <Icon className="mx-auto mb-2" />
          <span className="block text-center text-sm">{Icon.name}</span>
        </div>
      ))}
    </div>
  );
}
