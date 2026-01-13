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
          : 'not-first:border-t-[1px] not-first:border-t-gray-light align-baseline *:px-3 *:py-2',
      )}
    >
      {children}
    </tr>
  );
};

type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
};

const TableCell = (props: TableCellProps) => {
  const section = useContext(TableSectionContext);
  const Cell = section === 'head' ? 'th' : 'td';
  return <Cell {...props} />;
};

export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  type TableBodyProps,
  type TableCellProps,
  type TableHeadProps,
  type TableProps,
  type TableRowProps,
};
