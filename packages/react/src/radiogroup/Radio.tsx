import { cx } from 'cva';
import {
  Radio as RACRadio,
  RadioProps as RACRAdioProps,
} from 'react-aria-components';

const defaultClasses = cx([
  'relative inline-flex max-w-fit cursor-pointer items-center gap-4 py-2 leading-7',
  // the radio button itself
  'before:h-6 before:w-6 before:flex-none before:rounded-full before:border-2 before:border-black',
  // selected
  'data-[selected]:before:bg-green data-[selected]:before:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
  // hover states
  'data-[hovered]:before:border-green',
  // focus
  'data-[focus-visible]:before:ring data-[focus-visible]:before:ring-black data-[focus-visible]:before:ring-offset-[9px]',
  // invalid - The border is 1 px thicker when invalid. We don't actually want to change the border width, as that causes the element's size to change
  // so we use an inner outline to artifically pad the border
  'data-[invalid]:before:outline-solid data-[invalid]:before:border-red data-[invalid]:data-[selected]:before:bg-red data-[invalid]:before:outline data-[invalid]:before:outline-[3px] data-[invalid]:before:outline-offset-[-3px] data-[invalid]:before:outline-red',
]);

type RadioProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<RACRAdioProps, 'isDisabled' | 'children' | 'style'>;

function Radio(props: RadioProps) {
  const { children, className, ...restProps } = props;
  return (
    <RACRadio {...restProps} className={cx(className, defaultClasses)}>
      {/* increases the clickable area of the radio button for accessibility */}
      <div className="absolute -left-2.5 top-1/2 z-10 h-11 w-11 -translate-y-1/2" />
      {children}
    </RACRadio>
  );
}

export { Radio, type RadioProps };
