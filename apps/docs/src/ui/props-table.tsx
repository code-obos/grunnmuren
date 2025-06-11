import * as props from 'component-props';
import { AnchorHeading } from './anchor-heading';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';

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
      <Table className="mb-8 w-full text-sm" aria-describedby={headingId}>
        <TableHead>
          <TableRow>
            <TableCell>Prop</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Default</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(props[componentName].props).map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="italic">
                <code className="font-mono">
                  {prop.name}
                  {prop.required ? '' : '?'}
                </code>
              </TableCell>
              <TableCell>{prop.description}</TableCell>
              <TableCell>{prop.defaultValue?.value ?? '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
