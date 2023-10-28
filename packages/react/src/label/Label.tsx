import { cx } from 'cva';
import { Label as RACLabel } from 'react-aria-components';

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * A visual indicator for the label that user input is required on the input before form submission.
   * @default false
   */
  isRequired?: boolean;
  /**
   * Display the visual indicator for required fields as invalid. Only has an effect if `isRequired` is `true`.
   * @default false
   */
  isInvalid?: boolean;
};

function Label(props: LabelProps) {
  const { children, className, isInvalid, isRequired, ...restProps } = props;

  return (
    <RACLabel className={cx(className, 'font-semibold')} {...restProps}>
      {isRequired && (
        <span
          className={cx(
            'mr-1 select-none',
            isInvalid ? 'text-red' : 'text-blue',
          )}
        >
          *
        </span>
      )}
      {children}
    </RACLabel>
  );
}

export { Label, type LabelProps };
