import Link from 'next/link';
import { FC } from 'react';
import { ArrowRight } from '@obosbbl/grunnmuren-icons-react';

interface Props {
  title: string;
  content: string;
  href: string;
}

const Card: FC<Props> = ({ title, content, href }) => {
  return (
    <div className="relative max-w-prose rounded-xl border-2 border-white px-10 py-8 text-white">
      <Link
        href={href}
        className="w-full no-underline before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full"
      >
        <div className="mb-5 flex items-center justify-between before:absolute before:left-0 before:top-0 before:block before:h-full before:w-full hover:underline">
          <h3>{title}</h3>
          <ArrowRight className="h-8" />
        </div>
        <p>{content}</p>
      </Link>
    </div>
  );
};

export default Card;
