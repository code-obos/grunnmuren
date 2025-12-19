import * as props from 'component-props';
import type { PropItem } from 'react-docgen-typescript';
import { AnchorHeading } from './anchor-heading';
import { Table, TableBody, TableCell, TableHead, TableRow } from './table';

interface PropsTableProps {
  componentName: keyof typeof props;
}

export const PropsTable = ({ componentName }: PropsTableProps) => {
  const headingId = `${componentName.toLowerCase()}-props`;

  const componentProps = Object.values(props[componentName].props);

  const groupedProps = Object.groupBy(componentProps, (prop) => {
    switch (true) {
      case prop.name.startsWith('on'):
        return 'Events';
      case prop.name.startsWith('aria-'):
      // If the id prop is part of DOMProps, we know it's not actually necessary for the component, so we group it under 'Accessibility'
      case prop.name === 'id' && prop.parent?.name === 'DOMProps':
        return 'Accessibility';
      case prop.name === 'style':
      case prop.name === 'className':
        return 'Styles';
      case prop.parent?.name === 'LinkDOMProps':
        return 'Links';
      default:
        return 'Props';
    }
  });

  return (
    <div className="overflow-x-auto">
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
          <PropRows props={groupedProps.Props} />
          <PropRows props={groupedProps.Events} heading="Events" />
          <PropRows props={groupedProps.Links} heading="Links" />
          <PropRows props={groupedProps.Styles} heading="Styles" />
          <PropRows
            props={groupedProps.Accessibility}
            heading="Accessibility"
          />
        </TableBody>
      </Table>
    </div>
  );
};

const PropRows = ({
  props,
  heading,
}: {
  props?: Array<PropItem>;
  heading?: string;
}) => {
  if (!props) return null;

  return (
    <>
      {heading && (
        <TableRow>
          <th colSpan={3} className="font-bold">
            {heading}
          </th>
        </TableRow>
      )}
      {props.map((prop) => (
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
    </>
  );
};
