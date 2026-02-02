import * as GrunnmurenIconsScope from '@obosbbl/grunnmuren-icons-react';
import * as GrunnmurenScope from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { themes } from 'prism-react-renderer';
import { useState } from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

const { Disclosure, DisclosureButton, DisclosurePanel, Button } =
  GrunnmurenScope;

export type CodeProps = CodeSnippetProps & {
  caption?: string;
  /** @default false - Renders the code as a React component that is live editable */
  withLivePreview?: boolean;
  /** @default false - Makes the code editable */
  isEditable?: boolean;
};

type CodeSnippetProps = {
  value: string;
  setValue?: (newCode: string) => void;
};

const CodeSnippet = ({ value, setValue }: CodeSnippetProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  // Use the same black color as the background on the editor (#1e1e1e)
  return (
    <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] bg-[#1e1e1e]">
      <LiveEditor
        tabMode="focus"
        className="row-span-2 font-mono"
        onChange={setValue}
      />
      <div className="relative text-mint">
        <button
          className="size-[44px]"
          onClick={() =>
            navigator.clipboard.writeText(value).then(() => {
              setHasCopied(true);
              setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
            })
          }
          type="button"
        >
          <GrunnmurenIconsScope.Documents />
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
    </div>
  );
};

export const Code = ({
  value,
  setValue,
  withLivePreview,
  isEditable,
}: CodeProps) => {
  const scope = withLivePreview
    ? // Scope is only needed when rendering the live preview
      { ...GrunnmurenIconsScope, ...GrunnmurenScope }
    : undefined;

  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border">
      <LiveProvider
        code={value}
        scope={scope}
        theme={themes.vsDark}
        disabled={!isEditable}
      >
        {withLivePreview ? (
          <>
            <LivePreview className="not-prose grid place-items-center gap-y-2 p-18" />
            <Disclosure
              isExpanded={isCodeExpanded}
              onExpandedChange={setIsCodeExpanded}
              className="grid grid-cols-1"
            >
              <Button
                className="justify-self-end"
                variant="tertiary"
                slot="trigger"
              >
                {isCodeExpanded ? 'Skjul' : 'Vis'} kode
              </Button>
              <DisclosurePanel>
                <CodeSnippet value={value} setValue={setValue} />
              </DisclosurePanel>
            </Disclosure>
          </>
        ) : (
          <CodeSnippet value={value} />
        )}
      </LiveProvider>
    </div>
  );
};
