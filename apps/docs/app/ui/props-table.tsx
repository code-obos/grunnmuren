import * as props from 'docgen';
import { AnchorHeading } from './anchor-heading';

interface PropsTableProps {
  componentName: keyof typeof props;
}

export const PropsTable = ({ componentName }: PropsTableProps) => {
  const headingId = `${componentName.toLowerCase()}-props`;
  return (
    <>
      <AnchorHeading className="heading-s my-2" level={2} id={headingId}>
        {componentName}
      </AnchorHeading>
      <table className="mb-8 w-full text-sm" aria-describedby={headingId}>
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
    </>
  );
};
