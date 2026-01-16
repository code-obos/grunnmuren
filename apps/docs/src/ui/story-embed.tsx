import { useLayoutEffect } from '@tanstack/react-router';
import { Activity, useMemo, useRef, useState } from 'react';

type Props = {
  storyId: string;
};

export function StoryEmbed({ storyId }: Props) {
  const url = useMemo(
    () =>
      // `https://grunnmuren.obos.no/storybook/iframe.html?id=${storyId}&viewMode=story`,
      `https://grunnmuren.obos.no/storybook/?path=/story/${storyId}&singleStory=true&full=0&shortcuts=false`,
    [storyId],
  );

  // useEffect(() => {
  //   getControls(storyId);
  // }, [storyId]);

  return (
    <>
      <div className="my-6 flex flex-col gap-4">
        <div className="text-right">
          <a href={url} target="_blank" rel="external">
            Åpne eksempelet i egen fane
          </a>
        </div>
        {/*<iframe src={url} width="100%" height="500" title="Storybook embed" />*/}
      </div>
      <ViewSource storyId={storyId} />
    </>
  );
}

const ViewSource = ({ storyId }: Props) => {
  const [source, setSource] = useState<string | null>(null);
  const ref = useRef<HTMLIFrameElement>(null);
  const url = useMemo(
    () =>
      // `https://grunnmuren.obos.no/storybook/iframe.html?id=${storyId}&viewMode=story`,
      // `https://grunnmuren.obos.no/storybook/?path=/story/${storyId}&singleStory=true&full=0&shortcuts=false`,
      `http://localhost:3003/storybook/index.html?path=/story/${storyId}&singleStory=true&full=0&shortcuts=false`,
    [storyId],
  );

  console.log(source);

  useLayoutEffect(() => {
    const pre = ref.current?.contentDocument?.querySelector('pre');
    setSource(pre?.firstChild?.textContent);
    // if (code) {
    //   code.addEventListener('click', () => {
    //     console.log('tab clicked');
    //   });
    // }
  }, []);

  function onLoad(e) {
    console.log('iframe loaded');
    console.log(e.target.contentDocument.querySelector('pre'));
    console.log(
      e.target.contentWindow.document.querySelectorAll('[role="tab"]'),
    );

    const pre = ref.current?.contentDocument?.querySelector('pre');
    console.log(pre);
    setSource(pre?.firstChild?.textContent);
  }

  return (
    <div className="my-6 flex flex-col gap-4">
      <pre dangerouslySetInnerHTML={{ __html: source }} />
      {/*<Activity mode="hidden">*/}
      <iframe
        src={url}
        width="100%"
        height="500"
        title="Storybook embed"
        onLoad={onLoad}
        ref={ref}
        aria-hidden
      />
      {/*</Activity>*/}
    </div>
  );
};

async function getSource(storyId: string) {
  const module = await import(
    `http://localhost:3003/storybook/assets/link.stories-_-kiYUfR.js`
  );
  console.log(module);

  return module;
}

async function getControls(storyId: string) {
  const { default: meta } = await import(
    'http://localhost:3003/storybook/assets/carousel.stories-C58JkJA4.js'
  );

  console.log(meta);
  console.log(meta.component.__docgenInfo.props);
}
