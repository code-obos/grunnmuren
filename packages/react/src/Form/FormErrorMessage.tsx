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
        'bg-red-light flex items-center gap-2 rounded px-2 py-1 text-sm text-[#C03850]',
      )}
      aria-live="polite"
      {...rest}
    >
      <Warning className="flex-shrink-0 text-[#C03850]" />
      {children}
    </div>
  );
};
