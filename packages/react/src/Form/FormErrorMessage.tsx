import { cx } from '@/utils';
import { Warning } from '@obosbbl/grunnmuren-icons';

export interface FormErrorMessageProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export const FormErrorMessage = (props: FormErrorMessageProps) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={cx(
        className,
        'bg-red-light text-red flex items-center gap-2 rounded py-1 px-2 text-sm',
      )}
      aria-live="polite"
      {...rest}
    >
      <Warning className="text-red flex-shrink-0" />
      {children}
    </div>
  );
};
