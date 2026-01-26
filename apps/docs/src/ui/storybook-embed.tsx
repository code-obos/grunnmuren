import { Button } from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { Activity, useEffect, useMemo, useRef, useState } from 'react';
import { Group } from 'react-aria-components';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  storyId: string;
};
// only allow postmessages from this origin
const ALLOWED_POST_MESSAGE_ORIGIN = new URL(
  import.meta.env.VITE_STORYBOOK_BASE_URL,
).origin;

export function StorybookEmbed({ storyId }: Props) {
  const storyUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_STORYBOOK_BASE_URL;

    return `${baseUrl}/iframe.html?id=${storyId}&viewMode=story`;
  }, [storyId]);

  const [sourceCode, setSourceCode] = useState('');

  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  return (
    <div className="my-6">
      <div className="flex justify-between">
        <Group>
          <Button variant="tertiary" onPress={() => setViewMode('preview')}>
            Forhåndsvisning
          </Button>
          <Button variant="tertiary" onPress={() => setViewMode('code')}>
            Kode
          </Button>
        </Group>
        <a href={storyUrl} target="_blank" rel="external">
          Åpne i SB
        </a>
      </div>
      <div
        className={cx(
          'overflow-hidden rounded-lg',
          // Only add the border if the view mode is preview
          // prevents rendering artifacts for the corners of the code snippet
          viewMode === 'preview' && 'border',
        )}
      >
        <Activity mode={viewMode === 'preview' ? 'visible' : 'hidden'}>
          <StoryRenderer storyUrl={storyUrl} setSourceCode={setSourceCode} />
        </Activity>
        {viewMode === 'code' && <Code source={sourceCode} />}
      </div>
    </div>
  );
}

const StoryRenderer = ({
  storyUrl,
  setSourceCode,
}: {
  storyUrl: string;
  setSourceCode: (sourceCode: string) => void;
}) => {
  const [contentHeight, setContentHeight] = useState<number>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // If the storybook iframe finished loading before the
  // react component, we need to pass a message to send the
  // data again
  useEffect(() => {
    if (contentHeight == null) {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'REQUEST_STORY_DATA' },
        '*',
      );
    }
  }, [contentHeight]);

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== ALLOWED_POST_MESSAGE_ORIGIN) return;

      const data = event.data;

      if (typeof data === 'object' && 'type' in data) {
        if (data.type === 'STORY_SOURCE') {
          setSourceCode(data.source);
        } else if (data.type === 'STORY_HEIGHT') {
          setContentHeight(data.scrollHeight);
        }
      }
    };
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [setSourceCode]);

  return (
    <iframe
      className="focus:outline-none"
      src={storyUrl}
      width="100%"
      height={contentHeight}
      title="Storybook embed"
      ref={iframeRef}
      loading="lazy"
    />
  );
};

const Code = ({ source }: { source: string }) => {
  return (
    <ShikiHighlighter
      theme="ayu-dark"
      language="tsx"
      showLanguage={false}
      className="text-sm"
    >
      {source}
    </ShikiHighlighter>
  );
};
