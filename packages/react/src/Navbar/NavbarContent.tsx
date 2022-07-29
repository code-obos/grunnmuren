import classNames from 'clsx';
import { NavbarMenuButton } from './NavbarMenuButton';

export interface NavbarContentProps {
  children?: React.ReactNode;
  logo: React.ReactNode;
  className?: string;

  loginItems?: React.ReactNode;
  isLoginOpen?: boolean;
}

export const NavbarContent = (props: NavbarContentProps) => {
  const { className, children, logo, loginItems, isLoginOpen, ...rest } = props;
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

        <div className="col-start-2 col-end-3 hidden md:flex md:flex-row md:justify-end">
          {children}
        </div>

        {loginItems && (
          <div
            className={classNames(
              '<md:hidden col-start-1 col-end-3 grid max-h-[0] overflow-hidden transition-all duration-200 ease-in-out',
              {
                'max-h-[1000px]': isLoginOpen,
              },
            )}
            aria-hidden={!isLoginOpen}
          >
            <div className="bg-blue-dark container mt-2 grid grow grid-cols-3 gap-2 rounded-3xl">
              {loginItems}
            </div>
          </div>
        )}

        <NavbarMenuButton />
      </div>
    </div>
  );
};
