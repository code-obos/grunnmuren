import { cva, type VariantProps } from 'cva';
import { createContext } from 'react';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
  type ContextValue,
  useContextProps,
} from 'react-aria-components';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

const _LinkContext = createContext<
  ContextValue<Partial<LinkProps>, HTMLAnchorElement>
>({});

const linkVariants = cva({
  base: 'inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current focus-visible:outline-focus-offset *:[svg]:shrink-0',
  variants: {
    animateIcon: {
      right: 'hover:*:[svg]:motion-safe:translate-x-1',
      left: 'hover:*:[svg]:motion-safe:-translate-x-1',
      down: 'hover:*:[svg]:motion-safe:translate-y-1',
      up: 'hover:*:[svg]:motion-safe:-translate-y-1',
      'up-right':
        'hover:*:[svg]:motion-safe:-translate-y-0.5 hover:*:[svg]:motion-safe:translate-x-0.5',
    },
  },
  compoundVariants: [
    {
      animateIcon: ['right', 'down', 'left', 'up', 'up-right'],
      className: '*:[svg]:transition-transform',
    },
  ],
});

type LinkProps = VariantProps<typeof linkVariants> &
  _LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    /** @private Used internally for slotted components */
    _innerWrapper?: (props: _LinkProps) => LinkProps['children'];
  };

const Link = ({ ref: _ref, animateIcon, ..._props }: LinkProps) => {
  const [props, ref] = useContextProps(_props, _ref, _LinkContext);
  const { className, _innerWrapper, children: _children, ...restProps } = props;

  const locale = useLocale();
  const externalLinkSR = props.rel?.includes('external') ? (
    <span className="sr-only">{translations.externalLink[locale]}</span>
  ) : null;

  const reactNodeChildren = (
    <>
      {_children}
      {externalLinkSR}
    </>
  );

  const children = _innerWrapper
    ? _innerWrapper({
        ...restProps,
        children:
          typeof _children === 'function'
            ? (values) => _children(values)
            : reactNodeChildren,
      })
    : reactNodeChildren;

  return (
    <_Link
      {...restProps}
      ref={ref}
      data-slot="link"
      className={linkVariants({ className, animateIcon })}
    >
      {children}
    </_Link>
  );
};

export {
  _LinkContext,
  Link as UNSAFE_Link,
  type LinkProps as UNSAFE_LinkProps,
};
