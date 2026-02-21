import { PlayerPause, PlayerPlay } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../use-prefers-reduced-motion';

type VideoLoopProps = {
  /** The video url */
  src: string;
  /** The video format */
  format: string;
  /**
   * The content of the video must have a text description, so that it is accessible to screen readers.
   * You can either provide just a caption, just an alt text, or both a caption and an alt text.
   * Make sure the alt text doesn't repeat too much of the caption text, if so just a caption is sufficent.
   * Think of this just as an alt text, but for a muted video - this text will not be visible, but read by screen readers.
   * */
  alt?: string;
  className?: string;
};

export const VideoLoop = ({ src, format, alt, className }: VideoLoopProps) => {
  // Control the video playback state, so that the user can pause and play the video at will, also control the video autoplay
  const [shouldPlay, setShouldPlay] = useState(false);
  // Needed to show the pause button when the video is actually playing (refer to google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
  const [isPlaying, setIsPlaying] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Autoplay the video if the user does not prefer reduced motion
    setShouldPlay(!prefersReducedMotion);
  }, [prefersReducedMotion]);

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
    <div
      className={cx(
        className,
        'relative',
        prefersReducedMotion === null && 'opacity-0',
      )}
    >
      <video
        aria-hidden
        ref={videoRef}
        // cursor-pointer is not working on the button below, so we add it here for the same effect
        className="h-full max-h-[inherit] w-full cursor-pointer rounded-[inherit] object-cover"
        playsInline
        loop={prefersReducedMotion === false}
        autoPlay={prefersReducedMotion === false}
        muted
        onEnded={(event) => {
          if (prefersReducedMotion) {
            // Reset the video to the beginning if the user prefers reduced motion, since the video will not loop
            event.currentTarget.currentTime = 0;
            setShouldPlay(false);
            setIsPlaying(false);
          }
        }}
      >
        <source src={src} type={`video/${format}`} />
      </video>
      {prefersReducedMotion !== null && (
        <button
          data-slot="video-loop-button"
          // oxlint-disable-next-line jsx-a11y/no-aria-hidden-on-focusable
          aria-hidden
          type="button"
          onClick={() => setShouldPlay((prevState) => !prevState)}
          className={cx(
            'absolute top-0 right-0 bottom-0 left-0 m-auto grid place-items-center',
            'focus-visible:outline-focus focus-visible:outline-focus-offset',
            'rounded-[inherit]',
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
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white outline-hidden">
            {isPlaying ? <PlayerPause /> : <PlayerPlay />}
          </span>
        </button>
      )}
      {alt && <p className="sr-only">{alt}</p>}
    </div>
  );
};
