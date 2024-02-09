import { HeadingProps, Header as RACHeader } from 'react-aria-components';
import { cx } from 'cva';

const Header = (props: HeadingProps) => (
  <RACHeader
    {...props}
    className={cx(
      props.className,
      'mx-6 py-2 font-medium leading-6 text-blue-dark',
    )}
  />
);

export default Header;
