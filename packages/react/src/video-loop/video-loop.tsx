import { PlayerPause, PlayerPlay } from '@obosbbl/grunnmuren-icons-react';
import { useLayoutEffect } from '@react-aria/utils';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';

type VideoLoopPropsCommon = {
  src: string;
  format: string;
  /** You may specify a visible caption, but if it is very similar to the alt text. Just a caption is sufficent.  */
  caption?: string;
  /** You may pass an alternative text, complimentary to the caption. Make sure it doesn't repeat too much of the caption text, if so just a caption is sufficent. Think of this just as an alt text, but for a muted video - this text will not be visible, but read by screen readers. */
  alt?: string;
  className?: string;
  rounded?: boolean;
};

type VideoLoopPropsWithAlt = VideoLoopPropsCommon & {
  alt: string;
};

type VideoLoopPropsWithCaption = VideoLoopPropsCommon & {
  caption: string;
};

export type VideoLoopProps = VideoLoopPropsWithAlt | VideoLoopPropsWithCaption; // Either alt or caption is required

export const VideoLoop = ({
  src,
  format,
  caption,
  alt,
  className,
  rounded,
}: VideoLoopProps) => {
  // We need to check if the user prefers reduced motion, so that we can prevent the video from autoplaying if so
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState<
    null | boolean
  >(null);

  useLayoutEffect(() => {
    const { matches: userPrefersReducedMotion } = matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    setUserPrefersReducedMotion(userPrefersReducedMotion);
    // Autoplay the video if the user does not prefer reduced motion
    setShouldPlay(!userPrefersReducedMotion);
  }, []);

  // Control the video playback state, so that the user can pause and play the video at will
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (shouldPlay) {
      // Follow google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
      // "Don't assume a video will play, and don't show a pause button when the video is not actually playing."
      // "You should always look at the Promise returned by the play function to see if it was rejected:"
      // This is why we use the promise returned by the play function, and an extra state variable to determine if the video is actually playing or not
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  return (
    <div className={className}>
      <div className="relative aspect-video" aria-hidden>
        {/* Don't render the video until we have determined if the user prefers reduced motion */}
        {userPrefersReducedMotion !== null && (
          <>
            <video
              ref={videoRef}
              // cursor-pointer is not working on the button below, so we add it here for the same effect
              className={cx('cursor-pointer', rounded && 'rounded-3xl')}
              autoPlay={isPlaying}
              loop={isPlaying}
              playsInline
              muted
            >
              <source src={src} type={`video/${format}`} />
            </video>
            <button
              type="button"
              onClick={() => setShouldPlay((prevState) => !prevState)}
              className={cx(
                rounded && 'rounded-3xl', // Mirror the rounded prop from the parent div to align focus outline
                'absolute bottom-0 left-0 right-0 top-0 m-auto grid place-items-center',
                'focus-visible:outline-focus focus-visible:outline-focus-offset',
                // Only show the pause button when the video is hovered or focused
                isPlaying && [
                  'opacity-0',
                  'focus-visible:opacity-100',
                  'transition-opacity duration-200',
                  'hover:opacity-100',
                ],
              )}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white outline-none">
                {isPlaying ? <PlayerPause /> : <PlayerPlay />}
              </span>
            </button>
          </>
        )}
      </div>
      {caption && <p className="descrption mt-4">{caption}</p>}
      {alt && <p className="sr-only">{alt}</p>}
    </div>
  );
};
