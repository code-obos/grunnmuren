import classNames from 'clsx';
import { NavbarMenuButton } from './NavbarMenuButton';

export interface NavbarContentProps {
  children?: React.ReactNode;
  logo: React.ReactNode;
  className?: string;
}

export const NavbarContent = (props: NavbarContentProps) => {
  const { className, children, logo, ...rest } = props;
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between gap-8',
      )}
      {...rest}
    >
      {logo}

      <div className="hidden md:block">{children}</div>

      <NavbarMenuButton />
    </div>
  );
};
