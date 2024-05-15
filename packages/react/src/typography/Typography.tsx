import { HTMLProps } from 'react';
import { cx } from 'cva';

type HeadingProps = HTMLProps<HTMLHeadingElement>;

const H1 = ({ className, ...props }: HeadingProps) => (
  <h1 {...props} className={cx('h1', className)} />
);

const H2 = ({ className, ...props }: HeadingProps) => (
  <h2 {...props} className={cx('h2', className)} />
);

const H3 = ({ className, ...props }: HeadingProps) => (
  <h3 {...props} className={cx('h3', className)} />
);

const H4 = ({ className, ...props }: HeadingProps) => (
  <h4 {...props} className={cx('h4', className)} />
);

const H5 = ({ className, ...props }: HeadingProps) => (
  <h5 {...props} className={cx('h5', className)} />
);

const H6 = ({ className, ...props }: HeadingProps) => (
  <h6 {...props} className={cx('h6', className)} />
);

const Lead = ({ className, ...props }: HTMLProps<HTMLParagraphElement>) => (
  <p {...props} className={cx('lead', className)} />
);

const Body = ({ className, ...props }: HTMLProps<HTMLParagraphElement>) => (
  <p {...props} className={cx('body', className)} />
);

const Blockquote = ({
  className,
  children,
  ...props
}: HTMLProps<HTMLQuoteElement>) => (
  <blockquote {...props} className={cx('blockquote', className)}>
    {children}
  </blockquote>
);

export { H1, H2, H3, H4, H5, H6, Lead, Body, Blockquote, type HeadingProps };
