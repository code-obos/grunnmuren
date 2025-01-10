interface PropsTableProps {
  props: {
    [key: string]: {
      name: string;
      required: boolean;
      description: string;
      defaultValue: null | {
        value: string;
      };
    };
  };
}

export const PropsTable = ({ props }: PropsTableProps) => (
  <table className="my-12 w-full">
    <caption className="heading-m mb-2 text-left">Props</caption>
    <thead>
      <tr className="bg-sky-lightest text-left align-baseline *:px-3 *:py-2">
        <th>Prop</th>
        <th>Description</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      {Object.values(props).map((prop) => (
        <tr
          key={prop.name}
          className="border-t-gray-light align-baseline  *:px-3 *:py-2 [&:not(:first-child)]:border-t-[1px]"
        >
          <td className="italic">
            <code className="font-mono">
              {prop.name}
              {prop.required ? '' : '?'}
            </code>
          </td>
          <td>{prop.description}</td>
          <td>{prop.defaultValue?.value ?? '-'}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
