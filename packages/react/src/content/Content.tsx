import { HTMLProps } from 'react';

type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  children: React.ReactNode;
  /** The level of the heading */
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

const Heading = ({ level, ...restProps }: HeadingProps) => {
  const Heading = `h${level}` as const;
  return <Heading {...restProps} data-slot="heading" />;
};

type ContentProps = HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const Content = (props: ContentProps) => <div {...props} data-slot="content" />;

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
