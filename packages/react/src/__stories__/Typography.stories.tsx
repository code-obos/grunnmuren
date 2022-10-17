const metadata = {
  title: 'Typography',
  parameters: {
    layout: 'padded',
  },
};
export default metadata;

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>This is a H1 heading</h1>
      <h2>This is a H2 heading</h2>
      <h3>This is a H3 heading</h3>
      <h4>This is a H4 heading</h4>
      <p>This is a paragraph</p>
      <p className="text-sm"> This is a small paragraph</p>

      <span className="h1">This span looks like a H1</span>
      <span className="h2">This span looks like a H2</span>
      <span className="h3">This span looks like a H3</span>
      <span className="h4">This span looks like a H4</span>
    </div>
  );
};

export const Prose = () => {
  return (
    <div className="prose">
      <h1>Prose</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <ul>
        <li>List 1</li>
        <li>List 2</li>
        <li>List 3</li>
      </ul>
      <blockquote>
        <p>Quote. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </blockquote>
    </div>
  );
};
