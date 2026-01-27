import {
  UNSAFE_Tab as Tab,
  UNSAFE_TabList as TabList,
  UNSAFE_TabPanel as TabPanel,
  UNSAFE_Tabs as Tabs,
} from '@obosbbl/grunnmuren-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Code } from './code';

type Props = {
  storyId: string;
};

// only allow postmessages from this origin
const ALLOWED_POST_MESSAGE_ORIGIN = new URL(
  // @ts-expect-error this doesn't seem to work? https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables#typescript-declarations
  import.meta.env.VITE_STORYBOOK_BASE_URL,
).origin;

export function StorybookEmbed({ storyId }: Props) {
  const storyUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_STORYBOOK_BASE_URL;

    return `${baseUrl}/iframe.html?id=${storyId}&viewMode=story`;
  }, [storyId]);

  const [sourceCode, setSourceCode] = useState('');

  return (
    <div className="my-6">
      <Tabs>
        <TabList>
          <Tab id="preview">Forhåndsvisning</Tab>
          <Tab id="code">Kode</Tab>
        </TabList>
        <TabPanel id="preview" className="overflow-hidden rounded-lg border">
          <StoryRenderer storyUrl={storyUrl} setSourceCode={setSourceCode} />
        </TabPanel>
        <TabPanel id="code" className="overflow-hidden">
          <Code source={sourceCode} />
        </TabPanel>
      </Tabs>
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
      if (event.origin !== ALLOWED_POST_MESSAGE_ORIGIN) {
        return;
      }

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
