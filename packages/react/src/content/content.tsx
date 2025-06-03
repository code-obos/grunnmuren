import { type VariantProps, cva, cx } from 'cva';
import { type HTMLProps, type Ref, createContext } from 'react';
import { type ContextValue, useContextProps } from 'react-aria-components';

type HeadingProps = Omit<HTMLProps<HTMLHeadingElement>, 'size'> &
  VariantProps<typeof headingVariants> & {
    children?: React.ReactNode;
    /** The semantic level of the heading */
    level: 1 | 2 | 3 | 4 | 5 | 6;
    /** @private Used internally for slotted components */
    _innerWrapper?: (children: React.ReactNode) => React.ReactNode;
    /** @private Used internally for slotted components */
    _outerWrapper?: (children: React.ReactNode) => React.ReactNode;
    /** Ref for the element. */
    ref?: Ref<HTMLHeadingElement>;
  };

const HeadingContext = createContext<
  ContextValue<Partial<HeadingProps>, HTMLHeadingElement>
>({});

const headingVariants = cva({
  variants: {
    /** The visual text size of the heading */
    size: {
      xl: 'heading-xl',
      l: 'heading-l',
      m: 'heading-m',
      s: 'heading-s',
      xs: 'heading-xs',
    },
  },
});

const Heading = ({ ref = null, ...props }: HeadingProps) => {
  [props, ref] = useContextProps(props, ref, HeadingContext);

  const {
    children,
    level,
    size,
    className,
    _innerWrapper: innerWrapper,
    _outerWrapper: outerWrapper,
    ...restProps
  } = props;

  const _className = headingVariants({
    size,
  });

  const Element = `h${level}` as const;

  const content = (
    <Element
      {...restProps}
      className={cx(className, _className)}
      data-slot="heading"
    >
      {innerWrapper ? innerWrapper(children) : children}
    </Element>
  );

  return outerWrapper ? outerWrapper(content) : content;
};

const ContentContext = createContext<
  ContextValue<Partial<ContentProps>, HTMLDivElement>
>({});

type ContentProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
  /** @private Used internally for slotted components */
  _outerWrapper?: (children: React.ReactNode) => React.ReactNode;
  /** Ref for the element. */
  ref?: Ref<HTMLDivElement>;
};

const Content = ({ ref = null, ...props }: ContentProps) => {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { _outerWrapper: outerWrapper, ...restProps } = props;

  const content = <div {...restProps} data-slot="content" />;

  return outerWrapper ? outerWrapper(content) : content;
};

type MediaProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Media = (props: MediaProps) => <div {...props} data-slot="media" />;

type FooterProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

type CaptionProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Caption = ({ className, ...restProps }: CaptionProps) => (
  <div
    {...restProps}
    className={cx('description', className)}
    data-slot="caption"
  />
);

const Footer = (props: FooterProps) => <div {...props} data-slot="footer" />;

export {
  Caption,
  Content,
  ContentContext,
  Footer,
  Heading,
  HeadingContext,
  Media,
  type CaptionProps,
  type ContentProps,
  type FooterProps,
  type HeadingProps,
  type MediaProps,
};
