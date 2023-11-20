import { cx } from 'cva';
import {
  Radio as RACRadio,
  RadioProps as RACRAdioProps,
} from 'react-aria-components';

import { Description } from '../label';

const defaultClasses = cx([
  'relative inline-flex max-w-fit cursor-pointer items-start gap-4 py-2 leading-7',
  // the radio button itself
  'before:flex-none before:rounded-full before:border-2 before:border-black',
  // to vertically align the radio we need to calculate the label's height, which is equal to it's font size multiplied by the line height.
  // For the ::before psuedo element the line height of the label is always 1em.
  // When we know the height of the label we use the height of the radio to push it down to align with the label's first line
  // TODO: 1.75 here is the unit less lineheight, altough we use 1.75rem as the line height, so there is a mismatch here. Revisit this when we've worked on typography in v2. Should this be a CSS custom property instead?
  'before:mt-[calc((1em_*_1.75_-_24px)_/_2)] before:h-[24px] before:w-[24px]',
  // selected
  'data-[selected]:before:border-black data-[selected]:before:bg-green data-[selected]:before:shadow-[inset_0_0_0_4px_rgb(255,255,255)]',
  // hover
  'data-[hovered]:before:border-green data-[hovered]:before:bg-green-lightest data-[hovered]:data-[invalid]:before:bg-red-light',
  // focus
  'data-[focus-visible]:before:ring data-[focus-visible]:before:ring-black data-[focus-visible]:before:ring-offset-[9px]',
  // invalid - The border is 1 px thicker when invalid. We don't actually want to change the border width, as that causes the element's size to change
  // so we use an inner outline to artifically pad the border
  'data-[invalid]:before:outline-solid data-[invalid]:before:border-red data-[invalid]:data-[selected]:before:!bg-red data-[invalid]:before:outline data-[invalid]:before:outline-[3px] data-[invalid]:before:outline-offset-[-3px] data-[invalid]:before:outline-red',
]);

type RadioProps = {
  children: React.ReactNode;
  /** Additional CSS className for the element. */
  className?: string;
  /** Help text for the form control. */
  description?: React.ReactNode;
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
} & Omit<RACRAdioProps, 'isDisabled' | 'children' | 'style'>;

function Radio(props: RadioProps) {
  const { children, className, description, ...restProps } = props;
  return (
    <RACRadio {...restProps} className={cx(className, defaultClasses)}>
      {/* increases the clickable area of the radio button for accessibility */}
      <div className="absolute -left-2.5 top-0 z-10 h-11 w-11 " />

      <div>
        {children}
        {description && (
          <Description className="mt-2.5 block">{description}</Description>
        )}
      </div>
    </RACRadio>
  );
}

export { Radio, type RadioProps };
