import { cx } from 'cva';
import { createContext, useContext } from 'react';

type TableProps = {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

const Table = ({ children, className, ...restProps }: TableProps) => (
  <table
    className={cx(className, 'not-prose mb-8 w-full text-sm')}
    {...restProps}
  >
    {children}
  </table>
);

type TableHeadProps = {
  children: React.ReactNode;
  className?: string;
};

const TableSectionContext = createContext<'head' | 'body' | null>(null);

const TableHead = ({ children, className }: TableHeadProps) => (
  <TableSectionContext.Provider value="head">
    <thead className={cx(className)}>{children}</thead>
  </TableSectionContext.Provider>
);

type TableBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const TableBody = ({ children, className }: TableBodyProps) => (
  <TableSectionContext.Provider value="body">
    <tbody className={cx(className)}>{children}</tbody>
  </TableSectionContext.Provider>
);

type TableRowProps = {
  children: React.ReactNode;
  className?: string;
};

const TableRow = ({ children, className }: TableRowProps) => {
  const section = useContext(TableSectionContext);
  return (
    <tr
      className={cx(
        className,
        section === 'head'
          ? 'bg-sky-lightest text-left align-baseline *:px-3 *:py-2'
          : 'align-baseline *:px-3 *:py-2 [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-gray-light',
      )}
    >
      {children}
    </tr>
  );
};

type TableCellProps = {
  children: React.ReactNode;
  className?: string;
};

const TableCell = ({ children, className }: TableCellProps) => {
  const section = useContext(TableSectionContext);
  const Cell = section === 'head' ? 'th' : 'td';
  return <Cell className={className}>{children}</Cell>;
};

export {
  Table,
  type TableProps,
  TableHead,
  type TableHeadProps,
  TableBody,
  type TableBodyProps,
  TableRow,
  type TableRowProps,
  TableCell,
  type TableCellProps,
};
