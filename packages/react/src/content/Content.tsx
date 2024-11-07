import { cva, VariantProps } from 'cva';
import { HTMLProps, createContext, type ForwardedRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';

type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  children?: React.ReactNode;
  /** The level of the heading */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /** @private Used internally for slotted components */
  _innerWrapper?: (children: React.ReactNode) => React.ReactNode;
};

const HeadingContext = createContext<
  ContextValue<Partial<HeadingProps>, HTMLHeadingElement>
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
  ContextValue<Partial<ContentProps>, HTMLDivElement>
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

const MediaContext = createContext<
  ContextValue<Partial<MediaProps>, HTMLDivElement>
>({});

type MediaProps = HTMLProps<HTMLDivElement> &
  VariantProps<typeof mediaVariants> & {
    children: React.ReactNode;
  };

const mediaVariants = cva({
  variants: {
    aspectRatio: {
      // Sets the aspect ratio on any child
      // width: 100% is necessary to make aspect ratio work in FF
      '2:3': '*:aspect-[2/3] *:w-full [&_img]:object-cover',
      '3:4': '*:aspect-[3/4] *:w-full [&_img]:object-cover',
      '3:2': '*:aspect-[3/2] *:w-full [&_img]:object-cover',
      '4:3': '*:aspect-[4/3] *:w-full [&_img]:object-cover',
      '16:9': '*:aspect-video *:w-full [&_img]:object-cover',
    },
  },
});

const Media = (props: MediaProps, ref: ForwardedRef<HTMLDivElement>) => {
  [props, ref] = useContextProps(props, ref, MediaContext);
  const { className: _className, aspectRatio, ...restProps } = props;
  const className = mediaVariants({
    className: _className,
    aspectRatio,
  });

  return <div className={className} {...restProps} data-slot="media" />;
};

type FooterProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Footer = (props: FooterProps) => <div {...props} data-slot="footer" />;

export {
  type HeadingProps,
  Heading,
  HeadingContext,
  type ContentProps,
  Content,
  ContentContext,
  MediaContext,
  type MediaProps,
  Media,
  type FooterProps,
  Footer,
};
