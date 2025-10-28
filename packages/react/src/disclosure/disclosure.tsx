import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { filterDOMProps, mergeProps, mergeRefs } from '@react-aria/utils';
import { cva, cx, type VariantProps } from 'cva';
import {
  createContext,
  type DOMAttributes,
  type ForwardedRef,
  type HTMLAttributes,
  type HTMLProps,
  type RefAttributes,
  useContext,
  useId,
  useRef,
} from 'react';
import { useDisclosure, useFocusRing } from 'react-aria';
import {
  Button,
  ButtonContext,
  type ButtonProps,
  DEFAULT_SLOT,
  DisclosureContext,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosureGroupStateContext,
  Provider,
  type DisclosureProps as RACDisclosureProps,
  useContextProps,
} from 'react-aria-components';
import { type DisclosureState, useDisclosureState } from 'react-stately';

const disclosureButtonVariants = cva({
  base: [
    'inline-flex cursor-pointer items-center justify-between rounded-lg focus-visible:outline-current focus-visible:outline-focus',
    // Ensure a minimum click area of 44x44px, while making it look like it only has the size of the content
    'p-2.5 focus-visible:outline-offset-[-0.625rem]',
    '!data-[accordion]:-m-2.5',
  ],
  variants: {
    withChevron: {
      true: '[&[aria-expanded="true"]_svg]:rotate-180',
      false: null,
    },
    /**
     * When the button is without text, but with a single icon.
     * @default false
     */
    isIconOnly: {
      true: '[&>svg]:h-7 [&>svg]:w-7',
      false: 'gap-2.5',
    },
  },
  defaultVariants: {
    withChevron: false,
    isIconOnly: false,
  },
});

type DisclosureButtonProps = Omit<
  ButtonProps,
  'children' | 'aria-expanded' | 'aria-controls'
> &
  VariantProps<typeof disclosureButtonVariants> & {
    children: React.ReactNode;
  } & RefAttributes<HTMLButtonElement>;

const DisclosureButton = ({
  className,
  withChevron,
  isIconOnly,
  children,
  ref: _ref,
  ...restProps
}: DisclosureButtonProps) => {
  const [props, ref] = useContextProps(
    restProps,
    _ref as ForwardedRef<HTMLButtonElement>,
    ButtonContext,
  );
  return (
    <Button
      {...props}
      ref={ref}
      className={disclosureButtonVariants({
        className,
        withChevron,
        isIconOnly,
      })}
      slot="trigger"
    >
      {children}
      {withChevron && (
        <ChevronDown className="flex-none transition-transform duration-300 motion-reduce:transition-none" />
      )}
    </Button>
  );
};

type DisclosureProps = RACDisclosureProps &
  RefAttributes<HTMLDivElement> & {
    className?: string;
  };

export const DisclosureStateContext = createContext<DisclosureState | null>(
  null,
);

const Disclosure = ({ ref: _ref, children, ..._props }: DisclosureProps) => {
  const [props, ref] = useContextProps(
    _props,
    _ref as ForwardedRef<HTMLDivElement>,
    DisclosureContext,
  );
  const groupState = useContext(DisclosureGroupStateContext);

  let { id, ...otherProps } = props;
  const defaultId = useId();
  id ||= defaultId;
  const isExpanded = groupState
    ? groupState.expandedKeys.has(id)
    : props.isExpanded;

  const state = useDisclosureState({
    ...props,
    isExpanded,
    onExpandedChange(isExpanded) {
      if (groupState) {
        groupState.toggleKey(id);
      }

      props.onExpandedChange?.(isExpanded);
    },
  });

  const isDisabled = props.isDisabled || groupState?.isDisabled || false;

  const domProps = filterDOMProps(otherProps as HTMLProps<HTMLDivElement>);

  const { isFocusVisible: isFocusVisibleWithin } = useFocusRing({
    within: true,
  });

  const panelRef = useRef<HTMLDivElement | null>(null);
  const { buttonProps, panelProps } = useDisclosure(
    {
      ...props,
      isExpanded,
      isDisabled,
    },
    state,
    panelRef,
  );

  const { role: _, ...propsWithoutRole } = panelProps;

  return (
    <Provider
      values={[
        [DisclosureContext, state],
        [
          ButtonContext,
          {
            slots: {
              [DEFAULT_SLOT]: {}, // this is required in RAC (for non-trigger buttons)
              trigger: buttonProps,
            },
          },
        ],
        [DisclosurePanelContext, { ...propsWithoutRole, panelRef }],
        [DisclosureStateContext, state],
      ]}
    >
      <div
        {...domProps}
        className={otherProps.className}
        ref={ref}
        data-focus-visible-within={isFocusVisibleWithin || undefined}
        data-expanded={state.isExpanded || undefined}
        data-disabled={isDisabled || undefined}
      >
        {typeof children === 'function'
          ? children({
              isExpanded: state.isExpanded,
              isFocusVisibleWithin,
              isDisabled,
              state,
              defaultChildren: null,
            })
          : children}
      </div>
    </Provider>
  );
};

type DisclosurePanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  children: React.ReactNode;
  role?: 'group' | 'region' | 'none';
} & RefAttributes<HTMLDivElement>;

interface DisclosurePanelContextValue {
  panelProps?: DOMAttributes<HTMLElement>;
  panelRef?: React.RefObject<HTMLDivElement | null>;
}

const DisclosurePanelContext = createContext<DisclosurePanelContextValue>({});

const DisclosurePanel = ({ ref, children, ...props }: DisclosurePanelProps) => {
  const disclosureContext = useContext(
    DisclosureContext,
  ) as DisclosureProps | null;

  const { panelProps, panelRef } = useContext(DisclosurePanelContext);
  const { role: _role = 'group', className, ...restProps } = props;
  const ariaLabelledby =
    props['aria-labelledby'] ?? restProps['aria-labelledby'];
  const isWithoutRole = _role === 'none';
  const role = isWithoutRole ? undefined : _role;

  const { isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps } =
    useFocusRing({ within: true });

  const domProps = filterDOMProps(props);

  return (
    <div
      className={cx(
        'grid transition-all duration-300 motion-reduce:transition-none',
        disclosureContext?.isExpanded
          ? 'grid-rows-[1fr] after:h-3.5'
          : 'grid-rows-[0fr]',
      )}
      data-expanded={disclosureContext?.isExpanded || undefined}
    >
      <div className="overflow-hidden">
        {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: TODO: fix this */}
        <div
          ref={mergeRefs(ref, panelRef)}
          {...mergeProps(panelProps, focusWithinProps)}
          {...restProps}
          {...domProps}
          data-focus-visible-within={isFocusVisibleWithin || undefined}
          className={cx(className, '[content-visibility:visible]')}
          role={role}
          aria-labelledby={isWithoutRole ? undefined : ariaLabelledby}
          inert={disclosureContext?.isExpanded ? undefined : true}
        >
          <Provider
            values={[
              // Reset the context to avoid passing the same context to children, in case of nested Disclosures
              [DisclosureContext, null],
              [ButtonContext, null],
            ]}
          >
            {children}
          </Provider>
        </div>
      </div>
    </div>
  );
};

export {
  Disclosure as UNSAFE_Disclosure,
  DisclosureButton as UNSAFE_DisclosureButton,
  DisclosureGroup as UNSAFE_DisclosureGroup,
  DisclosurePanel as UNSAFE_DisclosurePanel,
  type DisclosureButtonProps as UNSAFE_DisclosureButtonProps,
  type DisclosureGroupProps as UNSAFE_DisclosureGroupProps,
  type DisclosurePanelProps as UNSAFE_DisclosurePanelProps,
  type DisclosureProps as UNSAFE_DisclosureProps,
};
