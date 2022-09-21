import { cx } from '@/utils';

export interface FormProps extends React.ComponentPropsWithoutRef<'form'> {
  children: React.ReactNode;
  heading?: string;
}

export const Form = (props: FormProps) => {
  const { heading, children, className, ...rest } = props;

  return (
    <form
      className={cx(
        className,
        'border-blue-dark block overflow-hidden rounded-t-3xl rounded-b-lg border-2',
      )}
      {...rest}
    >
      {heading && <FormHeading>{heading}</FormHeading>}
      <div className="p-6 md:p-10">{children}</div>
    </form>
  );
};

export interface FormHeadingProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const FormHeading = (props: FormHeadingProps) => {
  const { className, ...rest } = props;
  return (
    <h2
      className={cx(
        className,
        'bg-blue-dark p-6 text-xl font-bold text-white md:px-10 md:py-8 md:text-2xl',
      )}
      {...rest}
    />
  );
};
