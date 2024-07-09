import { Check as CheckIcon } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { type Ref, forwardRef } from 'react';
import { useId } from 'react';
import {
  CheckboxContext,
  Checkbox as RACCheckbox,
  type CheckboxProps as RACCheckboxProps,
} from 'react-aria-components';

import { ErrorMessage } from '../label/ErrorMessage';

const defaultClasses = cx([
  'group relative left-0 inline-flex max-w-fit cursor-pointer items-start gap-4 py-2 leading-7',
]);

// Pulling this out into it's own component. Will probably export it in the future
// so it can be used in other views, outside of an input of type checkbox, like in table rows.
function CheckmarkBox() {
  return (
    <span
      className={cx([
        'relative left-0 grid flex-none place-content-center rounded-sm border-2 border-black text-white',
        // to vertically align the radio we need to calculate the label's height, which is equal to it's font size multiplied by the line height.
        // For the ::before psuedo element the line height of the label is always 1em.
        // When we know the height of the label we use the height of the radio to push it down to align with the label's first line
        // TODO: 1.75 here is the unit less lineheight, altough we use 1.75rem as the line height, so there is a mismatch here. Revisit this when we've worked on typography in v2. Should this be a CSS custom property instead?
        'mt-[calc((1em_*_1.75_-_24px)_/_2)] h-[24px] w-[24px]',
        // selected
        'group-data-[selected]:!border-green group-data-[selected]:!bg-green',
        // focus
        'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-black group-data-[focus-visible]:ring-offset-[9px]',
        // hovered
        'group-data-[hovered]:border-green group-data-[hovered]:group-data-[invalid]:border-red group-data-[hovered]:bg-green-lightest group-data-[hovered]:group-data-[invalid]:bg-red-light',
        // invalid - The border is 1 px thicker when invalid. We don't actually want to change the border width, as that causes the element's size to change
        // so we use an inner shadow of 1 px instead to pad the actual border
        'group-data-[invalid]:border-red group-data-[invalid]:group-data-[selected]:shadow-none group-data-[invalid]:shadow-[inset_0_0_0_1px] group-data-[invalid]:shadow-red',
      ])}
    >
      <CheckIcon className="h-full w-full opacity-0 group-data-[selected]:opacity-100" />
    </span>
  );
}

type CheckboxProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Error message for the form control. Automatically sets `isInvalid` to true */
  errorMessage?: React.ReactNode;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<
  RACCheckboxProps,
  'isDisabled' | 'style' | 'children' | 'isIndeterminate' | 'isReadOnly'
>;

function Checkbox(props: CheckboxProps, ref: Ref<HTMLLabelElement>) {
  const {
    children,
    className,
    description,
    errorMessage,
    isInvalid: _isInvalid,
    ...restProps
  } = props;

  const id = useId();

  const descriptionId = 'desc' + id;
  const errorMessageId = 'error' + id;

  const isInvalid = errorMessage != null || _isInvalid;

  return (
    <div>
      <CheckboxContext.Provider
        value={{
          'aria-describedby': description ? descriptionId : undefined,
          'aria-errormessage': errorMessage ? errorMessageId : undefined,
        }}
      >
        <RACCheckbox
          {...restProps}
          className={cx(className, defaultClasses)}
          isInvalid={isInvalid}
          ref={ref}
        >
          {/* increases the clickable area of the checkbox for accessibility */}
          <span className="absolute -left-2.5 top-0 z-10 h-11 w-11" />
          <CheckmarkBox />
          {children}
        </RACCheckbox>

        {description && (
          // {/* Use a div instead of the Description component to avoid infinite re-render loops in React until this bug in RAC is fixed: https://github.com/adobe/react-spectrum/issues/6229 */}
          <div
            id={descriptionId}
            slot="description"
            className="description block"
          >
            {description}
          </div>
        )}
        {errorMessage && (
          <ErrorMessage className="mt-2 block" id={errorMessageId}>
            {errorMessage}
          </ErrorMessage>
        )}
      </CheckboxContext.Provider>
    </div>
  );
}

const _Checkbox = forwardRef(Checkbox);
export { _Checkbox as Checkbox, type CheckboxProps };
