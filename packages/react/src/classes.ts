import { cx, cva } from 'cva';

const formField = cx('group flex flex-col gap-2');
const formFieldError = cx(
  'w-fit rounded-sm bg-red-light px-2 py-1 text-sm leading-6 text-red',
);

const input = cva({
  base: [
    'rounded-md py-2.5 text-base font-normal leading-6 placeholder-[#727070] outline-none ring-1 ring-black',
    // invalid styles
    'group-data-[invalid]:ring-2 group-data-[invalid]:ring-red',
    // Fix invisible ring on safari: https://github.com/tailwindlabs/tailwindcss.com/issues/1135
    'appearance-none',
  ],
  variants: {
    // Focus rings. Can either be :focus or :focus-visible based on the needs of the particular component.
    focusModifier: {
      focus: 'focus:ring-2 group-data-[invalid]:focus:ring',
      visible:
        'data-[focus-visible]:ring-2 group-data-[invalid]:data-[focus-visible]:ring',
    },
    isGrouped: {
      false: 'px-3',
      true: 'flex-1 !ring-0',
    },
  },
  defaultVariants: {
    focusModifier: 'focus',
    isGrouped: false,
  },
});

const inputGroup = cx([
  'inline-flex items-center gap-3 overflow-hidden rounded-md bg-white px-3 text-base ring-1 ring-black focus-within:ring-2',
  'group-data-[invalid]:ring-2 group-data-[invalid]:ring-red group-data-[invalid]:focus-within:ring',
]);

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
