import { ArrowRight, Download, LinkExternal } from '@obosbbl/grunnmuren-icons-react';
import { compose, cva, type VariantProps } from 'cva';
import { useContext } from 'react';
import { Link as _Link, type LinkProps as _LinkProps } from 'react-aria-components/Link';

import { animateIconVariants } from '../classes';
import { LinkListContext } from '../link-list/link-list';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

const linkVariants = compose(
  animateIconVariants,
  cva({
    base: 'focus-visible:outline-focus-offset inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current data-disabled:cursor-default data-disabled:font-normal data-disabled:no-underline',
  }),
);

type LinkProps = VariantProps<typeof linkVariants> &
  _LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    children?: React.ReactNode;
  };

const Link = ({ animateIcon, children, className, ...props }: LinkProps) => {
  const locale = useLocale();
  const externalLinkText = translations.externalLink[locale];
  const shouldRenderAutoIcons = useContext(LinkListContext)?.shouldRenderAutoIcons ?? false;

  let resolvedAnimateIcon = animateIcon;
  let autoIcon: React.ReactNode = null;

  if (shouldRenderAutoIcons) {
    if (resolvedAnimateIcon === undefined) {
      resolvedAnimateIcon = props.download
        ? 'down'
        : props.rel?.includes('external')
          ? 'up-right'
          : 'right';
    }
    autoIcon = props.download ? (
      <Download />
    ) : props.rel?.includes('external') ? (
      <LinkExternal />
    ) : (
      <ArrowRight />
    );
  }

  return (
    <_Link
      {...props}
      data-slot="link"
      className={linkVariants({ className, animateIcon: resolvedAnimateIcon })}
    >
      {children}
      {props.rel?.includes('external') && <span className="sr-only">{externalLinkText}</span>}
      {autoIcon}
    </_Link>
  );
};

export { Link as UNSAFE_Link, type LinkProps as UNSAFE_LinkProps };
