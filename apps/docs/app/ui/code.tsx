import * as GrunnmurenIconsScope from '@obosbbl/grunnmuren-icons-react';
import * as GrunnmurenScope from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

export type CodeProps = {
  value: string;
  setValue?: (newCode: string) => void;
  caption?: string;
  /** @default false - Renders the code as a React component that is live editable */
  withLivePreview?: boolean;
  /** @default false - Makes the code editable */
  isEditable?: boolean;
};

export const Code = ({
  value,
  setValue,
  caption,
  withLivePreview,
  isEditable,
}: CodeProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const scope = withLivePreview
    ? // Scope is only needed when rendering the live preview
      { ...GrunnmurenIconsScope, ...GrunnmurenScope }
    : undefined;

  return (
    <LiveProvider
      code={value}
      scope={scope}
      theme={themes.vsDark}
      disabled={!isEditable}
    >
      <p>{caption}</p>
      {withLivePreview && (
        <LivePreview className="not-prose my-4 flex gap-x-4" />
      )}
      {/* Use the same black color as the background on the editor (#1e1e1e)  */}
      <div className="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] overflow-hidden rounded-lg bg-[#1e1e1e]">
        <LiveEditor
          tabMode="focus"
          className="row-span-2 font-mono"
          onChange={setValue}
        />
        <div className="relative text-mint">
          <GrunnmurenScope.Button
            onPress={() =>
              navigator.clipboard.writeText(value).then(() => {
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
