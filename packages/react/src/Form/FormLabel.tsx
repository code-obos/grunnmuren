import { cx } from '@/utils';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  children: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
}

export const FormLabel = (props: LabelProps) => {
  const { className, children, isRequired, isInvalid, ...rest } = props;

  return (
    <label
      className={cx(className, 'block cursor-pointer font-semibold')}
      {...rest}
    >
      {isRequired && (
        <span
          aria-hidden
          className={cx('ml-px select-none', {
            'text-red': isInvalid,
            'text-blue': !isInvalid,
          })}
        >
          *{' '}
        </span>
      )}
      {children}
    </label>
  );
};
