import { PlayerPause, PlayerPlay } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';

type VideoLoopProps = {
  /** The video url */
  src: string;
  /** The video format */
  format: string;
  /**
   * The content of the video must have a text description, so that it is accessible to screen readers.
   * You can either just provide a just caption, just an alt text, or both a caption and an alt text.
   * Make sure the alt text doesn't repeat too much of the caption text, if so just a caption is sufficent.
   * Think of this just as an alt text, but for a muted video - this text will not be visible, but read by screen readers.
   * */
  alt?: string;
  /**
   * Use this to provide a visible caption of the video content.
   * It can be used as a brief summary of the video content. If using this, you might not need to provide an alt text.
   * */
  children?: React.ReactNode;
  /** @default aspect-video */
  className?: string;
};

export const VideoLoop = ({
  src,
  format,
  alt,
  children,
  className = 'aspect-video',
}: VideoLoopProps) => {
  // Control the video playback state, so that the user can pause and play the video at will, also control the video autoplay
  const [shouldPlay, setShouldPlay] = useState(false);
  // Needed to show the pause button when the video is actually playing (refer to google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
  const [isPlaying, setIsPlaying] = useState(false);

  // We need to check if the user prefers reduced motion, so that we can prevent the video from autoplaying if so
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState<
    null | boolean
  >(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const { matches: userPrefersReducedMotion } = matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    setUserPrefersReducedMotion(userPrefersReducedMotion);
    // Autoplay the video if the user does not prefer reduced motion
    setShouldPlay(!userPrefersReducedMotion);
  }, []);

  // Follow google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
  // "Don't assume a video will play, and don't show a pause button when the video is not actually playing."
  // "You should always look at the Promise returned by the play function to see if it was rejected:"
  // This is why we use the promise returned by the play function, and an extra state variable to determine if the video is actually playing or not
  useEffect(() => {
    if (!videoRef.current) return;

    if (shouldPlay) {
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
    <>
      <div
        className={cx(
          className,
          'relative',
          userPrefersReducedMotion === null && 'opacity-0',
        )}
        aria-hidden
      >
        <video
          ref={videoRef}
          // cursor-pointer is not working on the button below, so we add it here for the same effect
          className={cx('cursor-pointer', 'h-full w-full object-cover')}
          playsInline
          loop={userPrefersReducedMotion === false}
          autoPlay={userPrefersReducedMotion === false}
          muted
          onEnded={(event) => {
            if (userPrefersReducedMotion) {
              // Reset the video to the beginning if the user prefers reduced motion, since the video will not loop
              event.currentTarget.currentTime = 0;
              setShouldPlay(false);
              setIsPlaying(false);
            }
          }}
        >
          <source src={src} type={`video/${format}`} />
        </video>
        {userPrefersReducedMotion !== null && (
          <button
            type="button"
            onClick={() => setShouldPlay((prevState) => !prevState)}
            className={cx(
              'absolute bottom-0 left-0 right-0 top-0 m-auto grid place-items-center',
              'focus-visible:outline-focus focus-visible:outline-focus-offset',
              // Setting the opacity to 0 before applying the transition below will ensure the button only fades in after the video has started playing
              shouldPlay && 'opacity-0',
              isPlaying && [
                'transition-opacity duration-200',
                // Only show the pause button when the video is hovered or focused
                'focus-visible:opacity-100',
                'hover:opacity-100',
              ],
            )}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white outline-none">
              {isPlaying ? <PlayerPause /> : <PlayerPlay />}
            </span>
          </button>
        )}
      </div>
      {children}
      {alt && <p className="sr-only">{alt}</p>}
    </>
  );
};
