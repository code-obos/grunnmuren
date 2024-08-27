import {
  HTMLProps,
  createContext,
  useEffect,
  useId,
  type ForwardedRef,
} from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { cx } from 'cva';
import { Text, type TextProps } from 'react-aria-components';

type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  children?: React.ReactNode;
  /** The level of the heading */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** @private Used internally for slotted components */
  _innerWrapper?: (children: React.ReactNode) => React.ReactNode;
};

const HeadingContext = createContext<
  ContextValue<HeadingProps, HTMLHeadingElement>
>({});

const Heading = (
  props: HeadingProps,
  ref: ForwardedRef<HTMLHeadingElement>,
) => {
  [props, ref] = useContextProps(props, ref, HeadingContext);

  const {
    children,
    level,
    className,
    _innerWrapper: innerWrapper,
    ...restProps
  } = props;

  const Element = `h${level}` as const;

  return (
    <Element {...restProps} className={className} data-slot="heading">
      {innerWrapper ? innerWrapper(children) : children}
    </Element>
  );
};

const ContentContext = createContext<
  ContextValue<ContentProps, HTMLDivElement>
>({});

type ContentProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  /** @private Used internally for slotted components */
  _outerWrapper?: (children: React.ReactNode) => React.ReactNode;
};

const Content = (props: ContentProps, ref: ForwardedRef<HTMLDivElement>) => {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { _outerWrapper: outerWrapper, ...restProps } = props;

  const content = <div {...restProps} data-slot="content" />;

  return outerWrapper ? outerWrapper(content) : content;
};

type FooterProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Footer = (props: FooterProps) => <div {...props} data-slot="footer" />;

export const DescriptionContext = createContext<
  ContextValue<DescriptionProps, HTMLElement>
>({});

type DescriptionProps = TextProps & {
  /** @private Used internally to ?? */
  _onMount?: (id: string) => void;
  /** @private Used internally for slotted components */
  _outerWrapper?: (children: React.ReactNode) => React.ReactNode;
};

const Description = (
  props: DescriptionProps,
  ref: ForwardedRef<HTMLElement>,
) => {
  [props, ref] = useContextProps(props, ref, DescriptionContext);
  const {
    className,
    _outerWrapper: outerWrapper,
    _onMount: onMount,
    ...restProps
  } = props;

  const autoId = useId();
  const id = restProps.id ?? autoId;

  useEffect(() => {
    onMount?.(id);
  }, [id]);

  const content = (
    <Text
      {...restProps}
      id={id}
      className={cx(className, 'description')}
      slot="description"
    />
  );

  return outerWrapper ? outerWrapper(content) : content;
};

export {
  type HeadingProps,
  Heading,
  HeadingContext,
  type ContentProps,
  Content,
  ContentContext,
  type FooterProps,
  Footer,
  Description,
  type DescriptionProps,
};
