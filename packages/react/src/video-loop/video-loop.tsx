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
  /** Image shown before the video plays, e.g. when the browser blocks autoplay. Defaults to the first frame of the video. */
  poster?: string;
  className?: string;
};

export const VideoLoop = ({ src, format, alt, poster, className }: VideoLoopProps) => {
  // Control the video playback state, so that the user can pause and play the video at will, also control the video autoplay
  const [shouldPlay, setShouldPlay] = useState(false);
  // Needed to show the pause button when the video is actually playing (refer to google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes)
  const [isPlaying, setIsPlaying] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Follow google's autoplay policy: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
  // The play promise can reject (e.g. iOS Low Power Mode), so only show the pause button once playback has actually started
  const play = () => {
    setShouldPlay(true);
    videoRef.current?.play().catch(() => setShouldPlay(false));
  };

  const pause = () => videoRef.current?.pause();

  useEffect(() => {
    if (prefersReducedMotion === false) {
      play();
    } else if (prefersReducedMotion) {
      pause();
    }
  }, [prefersReducedMotion]);

  // Without a poster, iOS Safari doesn't paint a frame until the video plays. The media fragment makes it load the first one.
  const videoSrc = poster || src.includes('#') ? src : `${src}#t=0.001`;

  // Called synchronously from the event handlers so Safari treats it as a user gesture
  const togglePlayback = () => {
    if (videoRef.current?.paused) {
      play();
    } else {
      pause();
    }
  };

  const locale = useLocale();

  return (
    <div
      className={cx(
        className,
        // group: hover anywhere reveals the button. @container: corner placement only when large.
        'group @container relative',
        prefersReducedMotion === null && 'opacity-0',
      )}
      data-slot="video-loop"
    >
      <video
        aria-hidden
        ref={videoRef}
        // Click anywhere on the video to toggle playback (in addition to the button)
        className={cx(
          'size-full max-h-[inherit] cursor-pointer rounded-[inherit] object-cover',
          // iOS shows its own start button when autoplay is blocked, on top of ours
          '[&::-webkit-media-controls-start-playback-button]:hidden',
        )}
        playsInline
        loop={prefersReducedMotion === false}
        autoPlay={prefersReducedMotion === false}
        muted
        poster={poster}
        preload="metadata"
        onClick={togglePlayback}
        // The browser can pause the video on its own (e.g. iOS when it scrolls out of view), so the state follows the element
        onPlaying={() => setIsPlaying(true)}
        onPause={() => {
          setIsPlaying(false);
          setShouldPlay(false);
        }}
        onEnded={(event) => {
          if (prefersReducedMotion) {
            // Reset the video to the beginning if the user prefers reduced motion, since the video will not loop
            event.currentTarget.currentTime = 0;
          }
        }}
        data-slot="video"
      >
        <source src={videoSrc} type={`video/${format}`} />
      </video>
      {/* Before the button so the description is read before the control */}
      {alt && <p className="sr-only">{alt}</p>}
      {prefersReducedMotion !== null && (
        <Button
          aria-label={
            isPlaying ? translations.pauseAnimation[locale] : translations.playAnimation[locale]
          }
          isIconOnly
          variant="primary"
          color="contrast"
          onPress={togglePlayback}
          className={cx(
            // Centered in small containers; moved to the bottom-left corner in larger ones
            'absolute inset-0 m-auto size-fit',
            '@md:inset-auto @md:bottom-4 @md:left-4',
            // Opacity-only transition; overrides Button's `transition-colors` so the focus outline doesn't flash black→white
            'transition-opacity duration-200',
            // Start hidden so the button fades in once the video plays
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
