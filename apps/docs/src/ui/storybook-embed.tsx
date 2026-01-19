import { Button } from '@obosbbl/grunnmuren-react';
import {
  Activity,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Group } from 'react-aria-components';
import ShikiHighlighter from 'react-shiki/web';

type Props = {
  storyId: string;
};

export function StorybookEmbed({ storyId }: Props) {
  const url = useMemo(
    () =>
      `http://localhost:3003/storybook/iframe.html?id=${storyId}&viewMode=story`,
    [storyId],
  );

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
        <a href={url} target="_blank" rel="external">
          Åpne eksempelet i egen fane
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border">
        {viewMode === 'preview' ? (
          <Activity mode={viewMode === 'preview' ? 'visible' : 'hidden'}>
            <StoryRenderer storyId={storyId} />
          </Activity>
        ) : (
          <div />
          // <StorySource storyId={storyId} />
        )}
      </div>
    </div>
  );
}

const StoryRenderer = ({ storyId }: Props) => {
  const url = useMemo(
    () =>
      `http://localhost:6006/storybook/iframe.html?id=${storyId}&viewMode=story`,
    [storyId],
  );

  const [contentHeight, setContentHeight] = useState<string>();
  const [iframeHasLoaded, setIframeHasLoaded] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    if (!ref.current && !iframeHasLoaded) return;

    const scrollHeight = ref.current?.contentDocument?.body.scrollHeight;
    if (scrollHeight) {
      setContentHeight(`${scrollHeight}px`);
    }
  }, [iframeHasLoaded]);

  useEffect(() => {
    ref.current?.contentWindow?.postMessage('handshake', '*');

    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== 'http://localhost:6006') return;
      console.log(event.data);

      const data = JSON.parse(event.data);

      if (
        data.key === 'storybook-channel' &&
        data.event.type === 'storybook/docs/snippet-rendered'
      ) {
        console.log(data.event);
      }

      // console.log(event.data);

      if (event.data.type === 'storybook-height') {
        setContentHeight(`${event.data.height}px`);
      }
    };
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <iframe
      className="focus:outline-none"
      src={url}
      width="100%"
      height={contentHeight}
      title="Storybook embed"
      onLoad={() => setIframeHasLoaded(true)}
      ref={ref}
      loading="lazy"
    />
  );
};

const StorySource = ({ source }: { source: string }) => {
  return (
    <ShikiHighlighter theme="ayu-dark" language="tsx" showLanguage={false}>
      {source}
    </ShikiHighlighter>
  );
};
