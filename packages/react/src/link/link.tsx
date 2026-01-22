import { compose, cva, type VariantProps } from 'cva';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
} from 'react-aria-components';
import { animateIconVariants } from '../classes';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

const linkVariants = compose(
  animateIconVariants,
  cva({
    base: 'inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current focus-visible:outline-focus-offset data-disabled:cursor-default',
  }),
);

type LinkProps = VariantProps<typeof linkVariants> &
  _LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    children?: React.ReactNode;
    /** @private Internal use */
    '~iconRight'?: React.ReactNode;
  };

const Link = ({
  animateIcon,
  children,
  className,
  '~iconRight': iconRight,
  ...props
}: LinkProps) => {
  const locale = useLocale();
  const externalLinkText = translations.externalLink[locale];

  return (
    <_Link
      {...props}
      data-slot="link"
      className={linkVariants({ className, animateIcon })}
    >
      {children}
      {props.rel?.includes('external') && (
        <span className="sr-only">{externalLinkText}</span>
      )}
      {iconRight}
    </_Link>
  );
};

export { Link as UNSAFE_Link, type LinkProps as UNSAFE_LinkProps };
