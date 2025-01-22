import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { type VariantProps, cva, cx } from 'cva';
import {
  createContext,
  useContext,
  useId,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { Button, type ButtonProps } from 'react-aria-components';

const DisclosureContext = createContext<{
  expanded: boolean;
  setExpanded?: Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}>({
  expanded: false,
});

const disclosureButtonVariants = cva({
  base: 'inline-flex items-center rounded-lg outline-none data-[focus-visible]:outline-focus',
  variants: {
    size: {
      // Ensure a minimum click area of 44x44px, while making it look like it only has the size of the content
      dense: '-m-2.5 p-2.5 data-[focus-visible]:outline-offset-[-0.625rem]',
      // Ensure a minimum click area of 44x44px, and a minimum size of 44x44px
      regular: 'data-[focus-visible]:outline-offset min-h-11 min-w-11',
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
  };

const DisclosureButton = ({
  className,
  size,
  withChevron,
  isIconOnly,
  children,
  onPress,
  ...restProps
}: DisclosureButtonProps) => {
  const { expanded, setExpanded, id } = useContext(DisclosureContext);
  return (
    <Button
      {...restProps}
      className={disclosureButtonVariants({
        className,
        size,
        withChevron,
        isIconOnly,
      })}
      aria-expanded={expanded}
      onPress={(e) => {
        if (setExpanded) setExpanded((prev) => !prev);
        if (onPress) onPress(e);
      }}
      aria-controls={id}
    >
      {children}
      {withChevron && (
        <ChevronDown className="flex-none transition-transform duration-300 motion-reduce:transition-none" />
      )}
    </Button>
  );
};

type DisclosureProps = {
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  isExpanded?: boolean;
  onExpandedChange?: Dispatch<SetStateAction<boolean>>;
};

const Disclosure = ({
  defaultExpanded = false,
  isExpanded,
  onExpandedChange,
  ...props
}: DisclosureProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const id = useId();

  return (
    <DisclosureContext.Provider
      value={{
        expanded: isExpanded ?? expanded,
        setExpanded: onExpandedChange ?? setExpanded,
        id,
      }}
    >
      <div {...props} />
    </DisclosureContext.Provider>
  );
};

type DisclosurePanelProps = {
  children: React.ReactNode;
  className?: string;
  role?: 'group' | 'region';
  'aria-labelledby'?: string;
  'aria-label'?: string;
};

const DisclosurePanel = ({ className, ...restProps }: DisclosurePanelProps) => {
  const { expanded, id } = useContext(DisclosureContext);
  return (
    <div
      className={cx(
        'grid transition-all duration-300 after:relative after:block after:h-0 after:transition-all after:duration-300 motion-reduce:transition-none',
        expanded ? 'grid-rows-[1fr] after:h-3.5' : 'grid-rows-[0fr]',
      )}
      inert={!expanded}
    >
      <div
        {...restProps}
        className={cx(
          className,
          'relative overflow-hidden before:relative before:block before:h-1.5 after:relative after:block after:h-1.5',
        )}
        id={id}
      />
    </div>
  );
};

export {
  Disclosure,
  type DisclosureProps,
  DisclosureButton,
  type DisclosureButtonProps,
  DisclosurePanel,
  type DisclosurePanelProps,
};
