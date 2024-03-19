import { HTMLProps, createContext, type ForwardedRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';

type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  children?: React.ReactNode;
  /** The level of the heading */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  _render?: (children: React.ReactNode) => React.ReactNode;
};

export const HeadingContext = createContext<
  ContextValue<HeadingProps, HTMLHeadingElement>
>({});

const Heading = (
  props: HeadingProps,
  ref: ForwardedRef<HTMLHeadingElement>,
) => {
  [props, ref] = useContextProps(props, ref, HeadingContext);

  let { children, level, className, _render: render, ...restProps } = props;

  const Element = `h${level}` as const;

  return (
    <Element {...restProps} className={className} data-slot="heading">
      {render ? render(children) : children}
    </Element>
  );
};

type ContentProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  _wrapper?: (children: React.ReactNode) => React.ReactNode;
};

export const ContentContext = createContext<
  ContextValue<ContentProps, HTMLDivElement>
>({});

const Content = (props: ContentProps, ref: ForwardedRef<HTMLDivElement>) => {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { _wrapper: wrapper, ...restProps } = props;

  const content = <div {...restProps} data-slot="content" />;

  return wrapper ? wrapper(content) : content;
};

type FooterProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Footer = (props: FooterProps) => <div {...props} data-slot="footer" />;

export {
  type HeadingProps,
  Heading,
  type ContentProps,
  Content,
  type FooterProps,
  Footer,
};
