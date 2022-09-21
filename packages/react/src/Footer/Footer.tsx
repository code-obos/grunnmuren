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
      <footer className={cx(className, 'bg-blue py-12 text-white')} {...rest}>
        <div className="container">{children}</div>
      </footer>
    </ButtonColorContext.Provider>
  );
};
