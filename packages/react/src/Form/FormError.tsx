import { cx } from '@/utils';

export interface FormErrorProps extends React.ComponentPropsWithoutRef<'div'> {}

export const FormError = (props: FormErrorProps) => {
  const { className, ...rest } = props;

  return (
    <div
      aria-live="polite"
      className={cx(
        className,
        'border-red bg-red-light rounded-lg border-2 p-6 text-sm',
      )}
      {...rest}
    >
      Beklager! Noe gikk dessverre galt under innesendingen av skjemaet. Prøv
      gjerne igjen om en stund.
    </div>
  );
};
