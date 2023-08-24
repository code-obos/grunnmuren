import Link from 'next/link';
import { FC } from 'react';
import { ArrowRight } from '@obosbbl/grunnmuren-icons-react';
import clsx from 'clsx';

interface Props {
  title: string;
  content: string;
  href: string;
  bgColor: 'blue' | 'white';
}

const Card: FC<Props> = ({ title, content, href, bgColor }) => {
  return (
    <div
      className={clsx('relative h-full max-w-prose rounded-xl px-10 py-8', {
        'bg-white': bgColor === 'white',
        'border-2 border-white text-white': bgColor === 'blue',
      })}
    >
      <Link
        href={href}
        className="group w-full no-underline before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full"
      >
        <div className="mb-3 flex items-center justify-between group-hover:underline">
          <h3>{title}</h3>
          <ArrowRight
            className={clsx(
              'h-6 w-6 group-hover:h-7 group-hover:w-7 group-hover:transition-all group-hover:duration-300',
              { 'text-green': bgColor === 'white' },
            )}
          />
        </div>
        <p>{content}</p>
      </Link>
    </div>
  );
};

export default Card;
