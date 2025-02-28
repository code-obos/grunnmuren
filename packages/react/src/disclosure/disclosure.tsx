import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { filterDOMProps } from '@react-aria/utils';
import { type VariantProps, cva, cx } from 'cva';
import {
  type ForwardedRef,
  type HTMLAttributes,
  type HTMLProps,
  type RefAttributes,
  createContext,
  useContext,
  useId,
  useRef,
} from 'react';
import { useDisclosure } from 'react-aria';
import {
  Button,
  ButtonContext,
  type ButtonProps,
  type ContextValue,
  DEFAULT_SLOT,
  DisclosureContext,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosureGroupStateContext,
  Provider,
  type DisclosureProps as RACDisclosureProps,
  useContextProps,
} from 'react-aria-components';
import { useDisclosureState } from 'react-stately';

const disclosureButtonVariants = cva({
  base: [
    'inline-flex cursor-pointer items-center justify-between rounded-lg outline-none data-[focus-visible]:outline-current data-[focus-visible]:outline-focus',
    // Ensure a minimum click area of 44x44px, while making it look like it only has the size of the content
    '-m-2.5 p-2.5 data-[focus-visible]:outline-offset-[-0.625rem]',
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
    children: React.ReactNode;
    className?: string;
  };

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
        [DisclosurePanelContext, { ...propsWithoutRole, ref: panelRef }],
      ]}
    >
      <div
        {...domProps}
        className={otherProps.className}
        ref={ref}
        data-expanded={state.isExpanded || undefined}
        data-disabled={isDisabled || undefined}
      >
        {children}
      </div>
    </Provider>
  );
};

type DisclosurePanelProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
  children: React.ReactNode;
  role?: 'group' | 'region' | 'none';
} & RefAttributes<HTMLDivElement>;

const DisclosurePanelContext = createContext<
  ContextValue<Partial<DisclosurePanelProps>, HTMLDivElement>
>({});

const DisclosurePanel = ({ ref: _ref, ..._props }: DisclosurePanelProps) => {
  const disclosureContext = useContext(
    DisclosureContext,
  ) as DisclosureProps | null;

  const [props, ref] = useContextProps(
    _props,
    _ref as ForwardedRef<HTMLDivElement>,
    DisclosurePanelContext,
  );
  const { role: _role = 'group', className, ...restProps } = props;
  const ariaLabelledby =
    _props['aria-labelledby'] ?? restProps['aria-labelledby'];
  const isWithoutRole = _role === 'none';
  const role = isWithoutRole ? undefined : _role;

  return (
    <div
      className={cx(
        'grid transition-all duration-300 after:relative after:block after:h-0 after:transition-all after:duration-300 motion-reduce:transition-none',
        disclosureContext?.isExpanded
          ? 'grid-rows-[1fr] after:h-3.5'
          : 'grid-rows-[0fr]',
      )}
    >
      <div
        {...restProps}
        ref={ref}
        className={cx(
          className,
          'relative overflow-hidden [content-visibility:visible] before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
        )}
        role={role}
        aria-labelledby={isWithoutRole ? undefined : ariaLabelledby}
      />
    </div>
  );
};

export {
  Disclosure as UNSAFE_Disclosure,
  DisclosureButton as UNSAFE_DisclosureButton,
  DisclosurePanel as UNSAFE_DisclosurePanel,
  DisclosureGroup as UNSAFE_DisclosureGroup,
  type DisclosureButtonProps as UNSAFE_DisclosureButtonProps,
  type DisclosurePanelProps as UNSAFE_DisclosurePanelProps,
  type DisclosureProps as UNSAFE_DisclosureProps,
  type DisclosureGroupProps as UNSAFE_DisclosureGroupProps,
};
