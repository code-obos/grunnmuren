import { Button } from '@obosbbl/grunnmuren-react';
import { Activity, useEffect, useMemo, useRef, useState } from 'react';
import { Group } from 'react-aria-components';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  storyId: string;
};

// only allow postmessages from these origins
const ALLOWED_MESSAGE_ORIGINS = new Set([
  'https://grunnmuren.obos.no',
  'http://localhost:6006',
]);

export function StorybookEmbed({ storyId }: Props) {
  const storyUrl = useMemo(
    () => `http://localhost:6006/iframe.html?id=${storyId}&viewMode=story`,
    [storyId],
  );

  const [sourceCode, setSourceCode] = useState('');

  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

  return (
    <div className="my-6">
      <div className="flex justify-between">
        <Group>
          <Button variant="tertiary" onPress={() => setViewMode('preview')}>
            Visning
          </Button>
          <Button variant="tertiary" onPress={() => setViewMode('code')}>
            Kode
          </Button>
        </Group>
        <a href={storyUrl} target="_blank" rel="external">
          Åpne i SB
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border">
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
  const [contentHeight, setContentHeight] = useState<string>();
  const [hasRegisteredListener, setHasRegisteredListener] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setHasRegisteredListener(true);

    const messageHandler = (event: MessageEvent) => {
      if (!ALLOWED_MESSAGE_ORIGINS.has(event.origin)) return;

      const data = event.data;

      if (typeof data === 'object' && 'type' in data) {
        if (data.type === 'SOURCE_SNIPPET_RENDERED') {
          setSourceCode(data.source);
        } else if (data.type === 'STORY_FINISHED') {
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
      src={hasRegisteredListener ? storyUrl : undefined}
      width="100%"
      height={contentHeight}
      title="Storybook embed"
      ref={ref}
      loading="lazy"
    />
  );
};

const Code = ({ source }: { source: string }) => {
  return (
    <ShikiHighlighter
      theme="dracula"
      language="tsx"
      showLanguage={false}
      className="text-sm"
    >
      {source}
    </ShikiHighlighter>
  );
};
