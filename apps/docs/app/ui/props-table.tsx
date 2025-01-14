import * as props from 'docgen';

interface PropsTableProps {
  componentName: keyof typeof props;
}

export const PropsTable = ({ componentName }: PropsTableProps) => (
  <table className="my-8 w-full text-sm">
    <caption className="heading-s mb-2 text-left">{componentName}</caption>
    <thead>
      <tr className="bg-sky-lightest text-left align-baseline *:px-3 *:py-2">
        <th>Prop</th>
        <th>Description</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      {Object.values(props[componentName].props).map((prop) => (
        <tr
          key={prop.name}
          className="border-t-gray-light align-baseline *:px-3 *:py-2 [&:not(:first-child)]:border-t-[1px]"
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
