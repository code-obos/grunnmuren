import * as GrunnmurenIconsScope from '@obosbbl/grunnmuren-icons-react';
import * as GrunnmurenScope from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

type ComponentPreviewProps = {
  title: string;
  /** @alpha - Passing a React.ReactNode is currently not compatible with React 19, pass a string to make it work with React 19 until react-element-to-jsx-string supports React 19  */
  code: React.ReactNode | string;
};

export const ComponentPreview = ({ title, code }: ComponentPreviewProps) => {
  // Keep of the code string in state to be able to copy it
  const [codeString, setCodeString] = useState(
    typeof code === 'string' ? code : reactElementToJSXString(code),
  );

  const [hasCopied, setHasCopied] = useState(false);
  return (
    <LiveProvider
      code={codeString}
      scope={{ ...GrunnmurenIconsScope, ...GrunnmurenScope }}
      theme={themes.vsDark}
    >
      <h3 className="heading-xs">{title}</h3>
      <LivePreview className="my-4 flex gap-x-4" />
      <div className="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] overflow-hidden rounded-lg bg-[#1e1e1e]">
        <LiveEditor
          tabMode="focus"
          // Use the same black color as the background on the editor
          className="row-span-2 font-mono"
          onChange={(newCode) => setCodeString(newCode)}
        />
        <div className="relative text-mint">
          <GrunnmurenScope.Button
            onPress={() =>
              navigator.clipboard.writeText(codeString).then(() => {
                setHasCopied(true);
                setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
              })
            }
            variant="tertiary"
          >
            <GrunnmurenIconsScope.Documents />
          </GrunnmurenScope.Button>
          <span
            className={cx(
              'absolute right-2 top-full transition-opacity duration-100',
              hasCopied ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={!hasCopied}
            role="alert"
          >
            Kopiert!
          </span>
        </div>
      </div>
    </LiveProvider>
  );
};
