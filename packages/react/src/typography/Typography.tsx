import { HTMLProps, forwardRef, type Ref } from 'react';
import { cx } from 'cva';

type HeadingProps = HTMLProps<HTMLHeadingElement>;

const H1 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h1 {...props} className={cx('h1', className)} ref={forwardedRef}>
      {props.children}
    </h1>
  ),
);

const H2 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h2 {...props} className={cx('h2', className)} ref={forwardedRef}>
      {props.children}
    </h2>
  ),
);

const H3 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h3 {...props} className={cx('h3', className)} ref={forwardedRef}>
      {props.children}
    </h3>
  ),
);

const H4 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h4 {...props} className={cx('h4', className)} ref={forwardedRef}>
      {props.children}
    </h4>
  ),
);

const H5 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h5 {...props} className={cx('h5', className)} ref={forwardedRef}>
      {props.children}
    </h5>
  ),
);

const H6 = forwardRef(
  (
    { className, ...props }: HeadingProps,
    forwardedRef: Ref<HTMLHeadingElement>,
  ) => (
    <h6 {...props} className={cx('h6', className)} ref={forwardedRef}>
      {props.children}
    </h6>
  ),
);

export { H1, H2, H3, H4, H5, H6, type HeadingProps };
