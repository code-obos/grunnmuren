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
  DisclosureContext,
  DisclosureGroupStateContext,
  Provider,
  type DisclosureProps as RACDisclosureProps,
  useContextProps,
} from 'react-aria-components';
import { useDisclosureState } from 'react-stately';

const disclosureButtonVariants = cva({
  base: 'inline-flex cursor-pointer items-center rounded-lg outline-none data-[focus-visible]:outline-focus',
  variants: {
    size: {
      // Ensure a minimum click area of 44x44px, while making it look like it only has the size of the content
      dense: '-m-2.5 p-2.5 data-[focus-visible]:outline-offset-[-0.625rem]',
      // Ensure a minimum click area of 44x44px, and a minimum size of 44x44px
      regular: 'min-h-11·min-w-11·data-[focus-visible]:outline-offset',
    },
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
    size: 'regular',
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
  size,
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
        size,
        withChevron,
        isIconOnly,
      })}
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
        [ButtonContext, buttonProps],
        [DisclosurePanelContext, { ...propsWithoutRole, ref: panelRef }],
      ]}
    >
      <div
        {...domProps}
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
  role?: 'group' | 'region' | 'presentation';
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
  const isWithoutRole = _role === 'presentation';
  const role = isWithoutRole ? undefined : _role;

  return (
    <div
      className={cx(
        'grid transition-all duration-300 after:relative after:block after:h-0 after:transition-all after:duration-300 motion-reduce:transition-none',
        disclosureContext?.isExpanded
          ? 'grid-rows-[1fr] after:h-3.5'
          : 'grid-rows-[0fr]',
      )}
      inert={!disclosureContext?.isExpanded}
    >
      <div
        {...restProps}
        ref={ref}
        className={cx(
          className,
          'relative overflow-hidden before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
        )}
        role={role}
        aria-labelledby={isWithoutRole ? undefined : ariaLabelledby}
      />
    </div>
  );
};

export {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  type DisclosureButtonProps,
  type DisclosurePanelProps,
  type DisclosureProps,
};
