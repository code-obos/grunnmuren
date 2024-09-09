import { useState } from 'react';
import { Pagination } from './Pagination';

const metadata = {
  title: 'Pagination',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    pageCount: {
      control: { type: 'number', min: 1, max: 30 },
    },
  },
};
export default metadata;

export const Default = (props: { pageCount: number }) => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      aria-label="Sidepaginering"
      currentPage={page}
      pageCount={props.pageCount}
      onChange={setPage}
      getItemHref={(page) => `#${page}`}
      getItemAriaLabel={(page) => `Side ${page}`}
      nextPageAriaLabel="Neste side"
      prevPageAriaLabel="Forrige side"
    />
  );
};

Default.args = {
  pageCount: 10,
};
