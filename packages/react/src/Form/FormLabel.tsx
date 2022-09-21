import { cx } from '@/utils';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  children: React.ReactNode;
  isRequired?: boolean;
}

export const FormLabel = (props: LabelProps) => {
  const { className, children, isRequired, ...rest } = props;

  return (
    <label
      className={cx(className, 'block cursor-pointer font-medium')}
      {...rest}
    >
      {children}
      {isRequired && (
        <span aria-hidden className="ml-px select-none">
          *
        </span>
      )}
    </label>
  );
};
