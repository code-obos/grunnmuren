import { cx } from 'cva';
import {
  Button,
  ListBox,
  Popover,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
} from 'react-aria-components';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';

// import { defaultClasses } from '../textfield/Input';
import { Label } from '../label/Label';
import { Description } from '../label/Description';
import { ErrorMessage } from '../label/ErrorMessage';

type SelectProps = {
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Label for the form control. */
  label?: React.ReactNode;
  /** Placeholder text. Only visible when the input value is empty. */
  placeholder?: string;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACSelectProps,
  'className' | 'isReadOnly' | 'isDisabled' | 'children' | 'style'
>;

// This handles spacing between the elements, in relation to each other
const layoutClasses = cx([
  'flex flex-col',
  '[&>label+input]:mt-2',
  '[&>label+[slot=description]]:mt-2',
  '[&>[slot=description]+[slot=control]]:mt-2',
  '[&>[slot=control]+[slot=errorMessage]]:mt-2',
]);

function Select(props: SelectProps) {
  const {
    children,
    className,
    description,
    errorMessage,
    label,
    isRequired,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  const isInvalid = _isInvalid || errorMessage != null;

  return (
    <RACSelect
      {...restProps}
      className={cx(className, layoutClasses)}
      isInvalid={isInvalid}
      isRequired={isRequired}
    >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
      <Button className={cx('flex items-center gap-2')}>
        <SelectValue className="flex-1 truncate text-left" />
        <ChevronDown />
      </Button>
      <Popover className="data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out w-[--trigger-width] overflow-auto rounded-md border border-gray bg-white shadow">
        <ListBox className="p-1 outline-none [&>[role=option]:focus]:bg-green-light [&>[role=option]]:select-none [&>[role=option]]:rounded [&>[role=option]]:px-4 [&>[role=option]]:py-2 [&>[role=option]]:outline-none">
          {children}
        </ListBox>
      </Popover>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </RACSelect>
  );
}

export { Select, type SelectProps };
