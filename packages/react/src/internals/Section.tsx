import { SectionProps, Section as RACSection } from 'react-aria-components';
import { cx } from 'cva';

/**
 * This component can be used to group items in a listbox
 */
const Section = <T extends object>({
  className,
  ...restProps
}: SectionProps<T>) => (
  <RACSection
    {...restProps}
    // The :not(:first-child) selector adds extra spacing to all the options, but not the section (group) headings
    // This way we get the desired extra indent on all options within a group
    className={cx(className, 'py-2 [&>:not(:first-child)]:pl-10')}
  />
);

export default Section;
