import { cx } from 'cva';
import { Input as RACInput } from 'react-aria-components';

export const defaultClasses = cx([
  'rounded-md border border-black px-4 py-3.5 placeholder-[#727070] data-[invalid]:border-red',
  'focus:outline-none data-[focused]:ring-2 data-[focused]:data-[invalid]:ring-red data-[focused]:ring-blue-dark',
]);

type InputProps = {
  className?: string;
};

function Input(props: InputProps) {
  const { className, ...restProps } = props;

  return (
    <RACInput
      {...restProps}
      className={cx(className, defaultClasses)}
      slot="control"
    />
  );
}

export { Input, InputProps };
