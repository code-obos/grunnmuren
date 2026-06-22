import { PlayerPause, PlayerPlay } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../button';
import { translations } from '../translations';
import { useLocale } from '../use-locale';
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

  const togglePlayback = () => setShouldPlay((prevState) => !prevState);

  const locale = useLocale();

  return (
    <div
      className={cx(
        className,
        // `group` lets the corner button reveal on hover anywhere over the video,
        // `@container` lets us move the button to the corner only in larger containers.
        'group @container relative',
        prefersReducedMotion === null && 'opacity-0',
      )}
      data-slot="video-loop"
    >
      <video
        aria-hidden
        ref={videoRef}
        // Clicking anywhere on the video toggles playback (like YouTube/Mux), in addition to the button below
        className="size-full max-h-[inherit] cursor-pointer rounded-[inherit] object-cover"
        playsInline
        loop={prefersReducedMotion === false}
        autoPlay={prefersReducedMotion === false}
        muted
        onClick={togglePlayback}
        onEnded={(event) => {
          if (prefersReducedMotion) {
            // Reset the video to the beginning if the user prefers reduced motion, since the video will not loop
            event.currentTarget.currentTime = 0;
            setShouldPlay(false);
            setIsPlaying(false);
          }
        }}
        data-slot="video"
      >
        <source src={src} type={`video/${format}`} />
      </video>
      {/* Rendered before the button so screen readers announce what the video shows before the playback control */}
      {alt && <p className="sr-only">{alt}</p>}
      {prefersReducedMotion !== null && (
        <Button
          // The video itself is decorative (aria-hidden), but the playback control must stay
          // exposed and labelled so keyboard/screen-reader users can pause the looping motion
          // (WCAG 2.2.2). The label is state-driven and framed around the motion, since the video is muted.
          aria-label={
            isPlaying ? translations.pauseAnimation[locale] : translations.playAnimation[locale]
          }
          isIconOnly
          variant="primary"
          color="white"
          onPress={togglePlayback}
          className={cx(
            // Centered in small containers; moved to the bottom-left corner in larger ones
            'absolute inset-0 m-auto size-fit',
            '@md:inset-auto @md:bottom-4 @md:left-4',
            // Restrict the transition to opacity only. The Button base has `transition-colors`,
            // which would otherwise animate `outline-color` from the button's currentColor to the
            // white focus outline, making the focus ring flash black→white. Keeping this here
            // (not gated on `isPlaying`) ensures it applies in the paused/visible state too.
            'transition-opacity duration-200',
            // Setting the opacity to 0 before applying the transition above will ensure the button only fades in after the video has started playing
            shouldPlay && 'opacity-0',
            isPlaying && [
              // Only show the pause button when the video is hovered or focused
              'focus-visible:opacity-100',
              'group-hover:opacity-100',
            ],
          )}
        >
          {isPlaying ? <PlayerPause /> : <PlayerPlay />}
        </Button>
      )}
    </div>
  );
};
