import { Check, Documents } from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  code: string;
  language?: 'tsx' | 'bash';
  caption?: string;
};

export const Code = ({ caption, code, language = 'tsx' }: Props) => {
  return (
    <div className="relative">
      <CopyButton code={code} />
      <ShikiHighlighter
        theme="ayu-dark"
        language={language}
        showLanguage={false}
        className="text-sm"
        // this is faster because it uses dangerouslySetInnerHTML
        // but this comoponent can only be used for trusted content
        outputFormat="html"
      >
        {code}
      </ShikiHighlighter>
      {caption && <p className="description">{caption}</p>}
    </div>
  );
};

const CopyButton = ({ code }: { code: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <>
      <button
        className="absolute top-0 right-0 z-10 grid size-11 cursor-pointer place-content-center text-mint-lightest hover:text-mint"
        onClick={() =>
          navigator.clipboard.writeText(code).then(() => {
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
    </>
  );
};
