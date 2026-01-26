import { Documents } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useState } from 'react';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  source: string;
};

export const Code = ({ source }: Props) => {
  const [hasCopied, setHasCopied] = useState(false);
  return (
    <>
      <div className="relative text-mint">
        <button
          className="size-[44px]"
          onClick={() =>
            navigator.clipboard.writeText(source).then(() => {
              setHasCopied(true);
              setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
            })
          }
          type="button"
        >
          <Documents />
        </button>
        <span
          className={cx(
            'absolute top-full right-2 transition-opacity duration-100',
            hasCopied ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden={!hasCopied}
          role="alert"
        >
          Kopiert!
        </span>
      </div>
      <ShikiHighlighter
        theme="ayu-dark"
        language="tsx"
        showLanguage={false}
        className="text-sm"
      >
        {source}
      </ShikiHighlighter>
    </>
  );
};
