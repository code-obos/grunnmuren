import { HTMLProps } from 'react';
import { cx } from 'cva';

type HeadingProps = HTMLProps<HTMLHeadingElement>;

const H1 = ({ className, ...props }: HeadingProps) => (
  <h1 {...props} className={cx('h1', className)}>
    {props.children}
  </h1>
);

const H2 = ({ className, ...props }: HeadingProps) => (
  <h2 {...props} className={cx('h2', className)}>
    {props.children}
  </h2>
);

const H3 = ({ className, ...props }: HeadingProps) => (
  <h3 {...props} className={cx('h3', className)}>
    {props.children}
  </h3>
);

const H4 = ({ className, ...props }: HeadingProps) => (
  <h4 {...props} className={cx('h4', className)}>
    {props.children}
  </h4>
);

const H5 = ({ className, ...props }: HeadingProps) => (
  <h5 {...props} className={cx('h5', className)}>
    {props.children}
  </h5>
);

const H6 = ({ className, ...props }: HeadingProps) => (
  <h6 {...props} className={cx('h6', className)}>
    {props.children}
  </h6>
);

export { H1, H2, H3, H4, H5, H6, type HeadingProps };
