import { useState } from 'react';
import { Pagination } from '../..';

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

export const Default = (props: any) => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      page={page}
      count={props.pageCount}
      createHref={(page) => `#${page}`}
      onChange={setPage}
      createAriaLabel={(page) => `Side ${page}`}
      nextPageAriaLabel="Neste side"
      prevPageAriaLabel="Forrige side"
    />
  );
};

Default.args = {
  pageCount: 10,
};
