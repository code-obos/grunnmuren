import { cx } from 'cva';
import { createContext, type HTMLProps } from 'react';
import {
  Link as _Link,
  type LinkProps as _LinkProps,
  type ContextValue,
  useContextProps,
} from 'react-aria-components';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type LinkProps = _LinkProps &
  React.RefAttributes<HTMLAnchorElement> & {
    /** @private Used internally for slotted components */
    _innerWrapper?: (props: _LinkProps) => LinkProps['children'];
  };

const _LinkContext = createContext<
  ContextValue<
    Partial<LinkProps & HTMLProps<HTMLAnchorElement>>,
    HTMLAnchorElement
  >
>({});

const Link = ({ ref: _ref, ..._props }: LinkProps) => {
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
      className={cx(
        className,
        'inline-flex cursor-pointer items-center gap-1 font-medium hover:no-underline focus-visible:outline-current focus-visible:outline-focus-offset [&>svg]:shrink-0 [&>svg]:transition-transform',
      )}
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
