import { cx } from '@/utils';

export interface FormHelperTextProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export const FormHelperText = (props: FormHelperTextProps) => {
  const { className, children, ...rest } = props;

  return (
    <div className={cx(className, 'text-gray-dark text-sm')} {...rest}>
      {children}
    </div>
  );
};
