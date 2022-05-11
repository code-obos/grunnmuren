import { Mail, MapPin, Mobile } from '@obosbbl/grunnmuren-icons';
import classNames from 'clsx';

export type IconName = keyof typeof iconMap;

interface IconLegacyProps {
  className?: string;
  name: IconName;
  children?: never;
}

/**
 *
 * NB! This component should only be used for compatibility reasons.
 * It uses old icon names and it causes all the referenced icons to be inluded in the application bundle.
 * Import icons from @obosbbl/grunnmuren-icons instead.
 */
export const IconLegacy = (props: IconLegacyProps) => {
  const { className, name, ...rest } = props;

  const IconComponent = iconMap[name] ?? IconFallback;

  return (
    <IconComponent className={classNames(className, 'inline')} {...rest} />
  );
};

/** Blank fallback icon with the same size as an actual icon to prevent collapsing/layout issues in case an icon isn't found */
const IconFallback = (props: Record<string, unknown>) => (
  <svg
    aria-hidden={props['aria-label'] == null}
    height="1.25em"
    width="1.25em"
    {...props}
  />
);

// Add to this as needed. We want to map as few icons as possible, because they will all be bundled in the app
const iconMap = {
  mapmarker: MapPin,
  smartphone: Mobile,
  envelope: Mail,
} as const;
