import { cva, cx, type VariantProps } from 'cva';
import { createContext, type HTMLProps, type Ref, useContext } from 'react';
import { type ContextValue, Provider, useContextProps } from 'react-aria-components/slots';

import { ButtonContext, type ButtonProps } from '../button';

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

const HeadingContext = createContext<ContextValue<Partial<HeadingProps>, HTMLHeadingElement>>({});

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
    <Element {...restProps} className={cx(className, _className)} data-slot="heading">
      {innerWrapper ? innerWrapper(children) : children}
    </Element>
  );

  return outerWrapper ? outerWrapper(content) : content;
};

const ContentContext = createContext<ContextValue<Partial<ContentProps>, HTMLDivElement>>({});

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

type MediaProps = HTMLProps<HTMLDivElement> &
  VariantProps<typeof mediaVariant> & {
    children: React.ReactNode;
    /** Ref for the element. */
    ref?: Ref<HTMLDivElement>;
  };

const mediaVariant = cva({
  variants: {
    /**
     * Control how the content should be placed with the object-fit property
     * You might for example want to use `fit="contain"` portrait images that should not be cropped
     * @default cover
     * */
    fit: {
      cover: '*:object-cover',
      contain: '*:object-contain',
    },
  },
});

const MediaContext = createContext<ContextValue<Partial<MediaProps>, HTMLDivElement>>({});

const Media = ({ ref = null, ...props }: MediaProps) => {
  [props, ref] = useContextProps(props, ref, MediaContext);

  const { className, fit, ...restProps } = props;

  const _className = mediaVariant({
    fit,
  });

  return (
    <div
      ref={ref}
      className={cx(className, _className)}
      // This can be used (internally) in other components
      // to apply custom styles to the media element depending on the fit
      data-fit={fit}
      {...restProps}
      data-slot="media"
    />
  );
};

type FooterProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

type CaptionProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Caption = ({ className, ...restProps }: CaptionProps) => (
  <div {...restProps} className={cx('description', className)} data-slot="caption" />
);

const Footer = (props: FooterProps) => <div {...props} data-slot="footer" />;

type HeaderProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

// The two contexts a Modal/Drawer wraps the header content in (typed explicitly
// so the values pass through context and into `Provider` without casts).
type HeaderProviderValues = [
  [typeof HeadingContext, ContextValue<Partial<HeadingProps>, HTMLHeadingElement>],
  [typeof ButtonContext, ContextValue<ButtonProps, HTMLButtonElement | HTMLAnchorElement>],
];

const HeaderContext = createContext<{
  /** @private Set by Modal/Drawer with the contexts to wrap the header content in */
  _providerValues?: HeaderProviderValues;
}>({});

/**
 * Wraps the title of a Modal/Drawer (and, optionally, a `<Button slot="close" />`).
 *
 * Renders a `data-slot="header"` element consumers can style freely, e.g.
 * `className="sticky top-0 bg-white"`. Inside a Modal/Drawer the dialog provides
 * (via `HeaderContext`) the contexts to wrap the content in — wiring the title's
 * accessible name (`aria-labelledby`) and the close button's appearance — so the
 * consumer only writes a `Heading` and a bare `<Button slot="close" />`, with no
 * `slot="title"` needed.
 */
const Header = ({ children, ...props }: HeaderProps) => {
  const { _providerValues } = useContext(HeaderContext);
  return (
    <div {...props} data-slot="header">
      {_providerValues ? <Provider values={_providerValues}>{children}</Provider> : children}
    </div>
  );
};

export {
  Caption,
  Content,
  ContentContext,
  Footer,
  Header,
  HeaderContext,
  Heading,
  HeadingContext,
  Media,
  MediaContext,
  type CaptionProps,
  type ContentProps,
  type FooterProps,
  type HeaderProps,
  type HeadingProps,
  type MediaProps,
};
