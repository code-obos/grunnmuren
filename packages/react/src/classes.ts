import { cx, cva } from 'cva';

const formField = cx('group flex flex-col gap-2');
const formFieldError = cx(
  'w-fit rounded-sm bg-red-light px-2 py-1 text-sm leading-6 text-red',
);

const input = cva({
  base: [
    'rounded-md px-3 py-2.5 text-sm font-normal leading-6 placeholder-[#727070] outline-none ring-1 ring-black',
    // Prevents excessive date input height in Webkit
    '[&:-webkit-datetime-edit]:block [&:-webkit-datetime-edit]:p-0',
    // invalid styles
    'group-data-[invalid]:ring-2 group-data-[invalid]:ring-red',
  ],
  variants: {
    // Focus rings. Can either be :focus or :focus-visible based on the needs of the particular component.
    focusModifier: {
      focus: 'focus:ring-2 group-data-[invalid]:focus:ring',
      visible:
        'data-[focus-visible]:ring-2 group-data-[invalid]:data-[focus-visible]:ring',
    },
    isGrouped: {
      false: '',
      //
      true: 'flex-1 !ring-0 first:pl-0 last:pr-0',
    },
  },
  defaultVariants: {
    focusModifier: 'focus',
    isGrouped: false,
  },
});

const inputGroup = cx(
  'inline-flex items-center overflow-hidden rounded-md px-3 ring-1 ring-black focus-within:ring-2 group-data-[invalid]:ring-2 group-data-[invalid]:ring-red group-data-[invalid]:focus-within:ring',
);

const dropdown = {
  popover: cx(
    'min-w-[--trigger-width] overflow-auto rounded-md border border-black bg-white shadow data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in data-[exiting]:fade-out',
  ),
  listbox: cx('text-sm outline-none'),
  chevronIcon: cx(
    'text-base transition-transform duration-150 group-data-[open]:rotate-180 motion-reduce:transition-none',
  ),
};

export { formField, formFieldError, input, inputGroup, dropdown };
