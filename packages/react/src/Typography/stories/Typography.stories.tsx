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

      <span className="gm-h1">This span looks like a H1</span>
      <span className="gm-h2">This span looks like a H2</span>
      <span className="gm-h3">This span looks like a H3</span>
      <span className="gm-h4">This span looks like a H4</span>
    </div>
  );
};
