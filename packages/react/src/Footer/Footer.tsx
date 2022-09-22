import { cx } from '@/utils';
import { ButtonColorContext } from '..';

interface FooterProps {
  className?: string;
  children: React.ReactNode;
}

export const Footer = (props: FooterProps) => {
  const { className, children, ...rest } = props;

  return (
    <ButtonColorContext.Provider value="white">
      <footer
        className={cx(
          className,
          'bg-blue pt-18 relative pb-12 text-white before:absolute before:top-0 before:left-0 before:right-0 before:h-6 before:rounded-b-3xl before:bg-white',
        )}
        {...rest}
      >
        <div className="container">{children}</div>
      </footer>
    </ButtonColorContext.Provider>
  );
};
