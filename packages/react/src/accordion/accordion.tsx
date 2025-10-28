import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { Children } from 'react';
import { Provider } from 'react-aria-components';
import { ContentContext, HeadingContext } from '../content';
import {
  UNSAFE_Disclosure as Disclosure,
  UNSAFE_DisclosureButton as DisclosureButton,
  UNSAFE_DisclosureGroup as DisclosureGroup,
  type UNSAFE_DisclosureGroupProps as DisclosureGroupProps,
  UNSAFE_DisclosurePanel as DisclosurePanel,
  type UNSAFE_DisclosureProps as DisclosureProps,
} from '../disclosure';

type AccordionProps = DisclosureGroupProps & {
  children: React.ReactNode;

  /** Whether multiple accordion items can be expanded at the same time. Default is true */
  allowsMultipleExpanded?: boolean;
};

type AccordionItemProps = DisclosureProps & {
  children?: React.ReactNode;

  /** DEPRECATED (use isExpanded): Whether the accordion is open (controlled) */
  isOpen?: boolean;

  /** DEPRECATED (use defaultExpanded): Whether the accordion is open by default (uncontrolled) */
  defaultOpen?: boolean;

  /** DEPRECATED (use onExpandedChange): Handler that is called when the accordion's open state changes */
  onOpenChange?: (isOpen: boolean) => void;
};

function Accordion(props: AccordionProps) {
  const {
    children,
    className,
    allowsMultipleExpanded = true,
    ...restProps
  } = props;

  const childCount = Children.count(children);

  return (
    <DisclosureGroup
      {...restProps}
      data-accordion
      allowsMultipleExpanded={allowsMultipleExpanded}
      className={cx('rounded-lg bg-white', className)}
    >
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < childCount - 1 && (
            // Margin is added to enable support for containers with a background color
            <hr className="mx-2 border-gray-light" aria-hidden />
          )}
        </>
      ))}
    </DisclosureGroup>
  );
}

function AccordionItem(props: AccordionItemProps) {
  const {
    className,
    children,
    defaultOpen = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    defaultExpanded,
    isExpanded,
    onExpandedChange,
    ...restProps
  } = props;

  const _defaultExpanded = defaultOpen ?? defaultExpanded;
  const _isExpanded = controlledIsOpen ?? isExpanded;
  const _onExpandedChange = onOpenChange ?? onExpandedChange;

  return (
    <Disclosure
      {...restProps}
      className={cx('relative px-2', className)}
      defaultExpanded={_defaultExpanded}
      onExpandedChange={_onExpandedChange}
      isExpanded={_isExpanded}
    >
      <Provider
        values={[
          [
            HeadingContext,
            {
              // Negative margin to strech the button to the entire with of the accordion (to support containers with a background color)
              className: 'font-medium leading-7 -mx-2 text-base',
              // Supply a default level here to make this typecheck ok. Will be overwritten with the consumers set heading level anyways
              level: 3,
              _innerWrapper: (children) => (
                <DisclosureButton
                  // Use outline with offset as focus indicator, this does not cover the left sky border on the expanded content and works with or without a background color on the accordion container
                  className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-1.5 rounded-lg px-2 py-3.5 text-left focus-visible:outline-focus focus-visible:outline-focus-inset aria-expanded:*:rotate-180"
                  type="button"
                >
                  {children}
                  <ChevronDown
                    className={cx(
                      'flex-none transition-transform duration-300 motion-reduce:transition-none',
                    )}
                  />
                </DisclosureButton>
              ),
            },
          ],
          [
            ContentContext,
            {
              className:
                // Uses pseudo element for vertical padding, since that doesn't affect the height when the accordion is closed
                'text-sm font-light leading-6 px-3.5 data-[expanded]:after:h-3.5 relative overflow-hidden border-sky border-l-[3px] before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
              role: 'region',
              _outerWrapper: (children) => (
                <DisclosurePanel>{children}</DisclosurePanel>
              ),
            },
          ],
        ]}
      >
        {children}
      </Provider>
    </Disclosure>
  );
}

export {
  Accordion,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
};
