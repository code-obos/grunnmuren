import { cx } from 'cva';
import {
  Radio as RACRadio,
  RadioProps as RACRAdioProps,
} from 'react-aria-components';

const defaultClasses = cx([
  'flex cursor-pointer items-center gap-2',
  // the radio button itself
  'before:h-5 before:w-5 before:flex-shrink-0 before:rounded-full before:border-2 before:border-gray before:transition-all before:duration-200',
  // selected
  'data-[selected]:before:border-green data-[selected]:before:bg-green data-[selected]:before:shadow-[inset_0_0_0_3px_rgb(255,255,255)]',
  // hover
  'data-[hovered]:before:border-green data-[hovered]:before:bg-green-lightest data-[selected]:data-[hovered]:before:bg-green',
  // focus
  'data-[focus-visible]:before:ring data-[focus-visible]:before:ring-black data-[focus-visible]:before:ring-offset-2',
]);

type RadioProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<RACRAdioProps, 'isDisabled' | 'children' | 'style'>;

function Radio(props: RadioProps) {
  const { className, ...restProps } = props;
  return <RACRadio {...restProps} className={cx(className, defaultClasses)} />;
}

export { Radio, type RadioProps };
