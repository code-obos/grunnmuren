import { Check, Documents } from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  source: string;
};

export const Code = ({ source }: Props) => {
  const [hasCopied, setHasCopied] = useState(false);
  return (
    <div className="relative">
      <button
        className="absolute top-0 right-0 z-10 grid size-11 cursor-pointer place-content-center text-mint-lightest hover:text-mint"
        onClick={() =>
          navigator.clipboard.writeText(source).then(() => {
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
          })
        }
        type="button"
        title="Kopier"
      >
        {hasCopied ? <Check /> : <Documents />}
      </button>
      <span className="sr-only" aria-hidden={!hasCopied} role="alert">
        Kopiert!
      </span>
      <ShikiHighlighter
        theme="ayu-dark"
        language="tsx"
        showLanguage={false}
        className="text-sm"
        // this is faster because it uses dangerouslySetInnerHTML
        // but this comoponent can only be used for trusted content
        outputFormat="html"
      >
        {source}
      </ShikiHighlighter>
    </div>
  );
};
