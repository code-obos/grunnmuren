import * as GrunnmurenIconsScope from '@obosbbl/grunnmuren-icons-react';
import * as GrunnmurenScope from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

type ComponentPreviewProps = {
  title: string;
  code: React.ReactNode;
  /** All custom components that are rendered must be present in the scope */
  scope: Partial<typeof GrunnmurenIconsScope & typeof GrunnmurenScope>;
};

export const ComponentPreview = ({
  title,
  code,
  scope,
}: ComponentPreviewProps) => {
  // Keep of the code string in state to be able to copy it
  const [codeString, setCodeString] = useState(reactElementToJSXString(code));

  const [hasCopied, setHasCopied] = useState(false);
  return (
    <LiveProvider code={codeString} scope={scope} theme={themes.vsDark}>
      <div className="my-8 grid gap-y-4">
        <h2 className="heading-m">{title}</h2>
        <hr />
        <LivePreview className="flex gap-x-4" />
        <div className="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] overflow-hidden rounded-lg bg-[#1e1e1e]">
          <LiveEditor
            tabMode="focus"
            // Use the same black color as the background on the editor
            className="font-mono row-span-2"
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
      </div>
    </LiveProvider>
  );
};
