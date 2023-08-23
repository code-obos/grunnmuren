import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  content: string;
}

const Card: FC<Props> = ({ title, content }) => {
  return (
    <div>
      <div className="shadow-gray-concrete hover:border-gray-concrete relative my-8 flex max-w-prose flex-col items-center rounded-xl border-2 border-white px-4 text-center transition-all duration-300 hover:my-0 hover:border-2 hover:pb-10 hover:pt-6 hover:shadow-md">
        <Link
          href=""
          className="z-10 no-underline before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full"
        >
          <h3>{title}</h3>
          <p>-{'>'}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
