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
    <div className="container">
      <div
        className={classNames(
          className,
          'sm:items grid grid-cols-[auto_1fr] gap-x-8',
        )}
        {...rest}
      >
        {logo}

        {children}

        <NavbarMenuButton />
      </div>
    </div>
  );
};
