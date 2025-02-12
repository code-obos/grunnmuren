import { cva, cx } from 'cva';

const formField = cx('group flex flex-col gap-2');
const formFieldError = cx(
  'w-fit rounded-sm bg-red-light px-2 py-1 text-red text-sm leading-6',
);

const input = cva({
  base: [
    // All inputs should always have a white background (this also ensures that type="search" on Safri doesn't get a gray background)
    'bg-white',
    // Use box-content to enable auto width based on number of characters (size)
    // Setting min-height to prevent the input from collapsing in Safari
    // Combining these with a padding-y as base classes makes it easier to standardize the height (44px) of all inputs
    'box-content min-h-6 py-2.5',
    'rounded-md font-normal text-base leading-6 placeholder-[#727070] outline-none ring-1 ring-black',
    // invalid styles
    'group-data-[invalid]:ring-focus group-data-[invalid]:ring-red',
    // Fix invisible ring on safari: https://github.com/tailwindlabs/tailwindcss.com/issues/1135
    'appearance-none',
  ],
  variants: {
    // Focus rings. Can either be :focus or :focus-visible based on the needs of the particular component.
    focusModifier: {
      focus: 'focus:ring-focus group-data-[invalid]:focus:ring',
      visible:
        'data-[focus-visible]:ring-focus group-data-[invalid]:data-[focus-visible]:ring',
    },
    isGrouped: {
      false: 'px-3',
      true: '!ring-0 flex-1',
    },
  },
  defaultVariants: {
    focusModifier: 'focus',
    isGrouped: false,
  },
});

const inputGroup = cx([
  'inline-flex items-center gap-3 overflow-hidden rounded-md bg-white px-3 text-base ring-1 ring-black focus-within:ring-focus',
  'group-data-[invalid]:ring-focus group-data-[invalid]:ring-red group-data-[invalid]:focus-within:ring',
]);

const dropdown = {
  popover: cx(
    'data-[entering]:fade-in data-[exiting]:fade-out min-w-[--trigger-width] overflow-y-auto rounded-md border border-black bg-white shadow data-[entering]:animate-in data-[exiting]:animate-out',
  ),
  // overflow-x-hidden is needed to prevent visible vertical scrollbars from overflowing the border radius of the popover
  listbox: cx('max-h-[25rem] overflow-x-hidden text-sm outline-none'),
  chevronIcon: cx(
    'text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none',
  ),
};

export { dropdown, formField, formFieldError, input, inputGroup };
