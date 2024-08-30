import React, { useId } from 'react';
import {
  Provider,
  ToggleButtonContext,
  ToggleButton,
} from 'react-aria-components';
import { cx } from 'cva';
import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { chain } from '@react-aria/utils';
import { useToggleState } from 'react-stately';

import { ContentContext } from '../content';

type DisclosureButtonProps = {
  children: React.ReactNode;
};

function DisclosureButton({
  children,
  className,
  ...props
}: DisclosureButtonProps) {
  return (
    <ToggleButton
      className={cx(
        className,
        'group description flex items-center gap-2 rounded-sm focus:outline-none data-[focus-visible]:outline data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-black',
      )}
      {...props}
    >
      {children}{' '}
      <ChevronDown className="flex-none transition-transform duration-300 group-aria-expanded:rotate-180 motion-reduce:transition-none" />
    </ToggleButton>
  );
}

type DisclosureProps = {
  children: React.ReactNode;
  /** Whether the accordion is open (controlled) */
  isOpen?: boolean;
  /** Whether the accordion is open by default (uncontrolled) */
  defaultOpen?: boolean;
  /** Handler that is called when the accordion's open state changes */
  onOpenChange?: (isOpen: boolean) => void;
};

function Disclosure(props: DisclosureProps) {
  const { children, defaultOpen, isOpen, onOpenChange: _onOpenChange } = props;

  const state = useToggleState({
    defaultSelected: defaultOpen,
    isSelected: isOpen,
  });

  // does the order of the chain matter here?
  const onOpenChange = chain(state.setSelected, _onOpenChange);

  const contentId = useId();

  return (
    <Provider
      values={[
        [
          ToggleButtonContext,
          {
            'aria-expanded': state.isSelected,
            'aria-controls': contentId,
            onChange: onOpenChange,
            isSelected: state.isSelected,
          },
        ],
        [
          ContentContext,
          {
            className:
              // Uses pseudo element for vertical padding, since that doesn't affect the height when the accordion is closed
              'description px-3.5 relative overflow-hidden border-mint border-l-[3px] before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
            // @ts-expect-error TODO: remove this expect-error when we're on React 19 https://github.com/facebook/react/issues/17157#issuecomment-2003750544
            inert: state.isSelected ? undefined : 'true',
            id: contentId,
            _outerWrapper: (children) => (
              <div
                className={cx(
                  'grid transition-all duration-300 after:relative after:block after:h-0 after:transition-all after:duration-300 motion-reduce:transition-none',
                  state.isSelected
                    ? 'grid-rows-[1fr] after:h-3.5'
                    : 'grid-rows-[0fr] ',
                )}
              >
                {children}
              </div>
            ),
          },
        ],
      ]}
    >
      {children}
    </Provider>
  );
}

export {
  Disclosure,
  type DisclosureProps,
  DisclosureButton,
  type DisclosureButtonProps,
};
