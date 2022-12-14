import { cx } from '@/utils';
import { useContext, forwardRef } from 'react';
import { RadioContext } from './RadioContext';

export interface RadioProps extends React.ComponentPropsWithoutRef<'input'> {
  children: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { children, className, ...rest } = props;

  const { defaultValue, isControlled, name, onChange, required, value } =
    useContext(RadioContext);

  return (
    <label className={cx(className, 'flex cursor-pointer gap-2.5')}>
      <input
        className="radio"
        defaultChecked={!isControlled ? rest.value === defaultValue : undefined}
        checked={isControlled ? rest.value === value : undefined}
        name={name}
        onChange={isControlled ? onChange : undefined}
        required={required}
        type="radio"
        ref={ref}
        {...rest}
      />
      {children}
    </label>
  );
});
