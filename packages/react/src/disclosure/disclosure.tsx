import { ChevronDown } from '@obosbbl/grunnmuren-icons-react';
import { type VariantProps, cva } from 'cva';
import {
  Button,
  type ButtonProps,
  DisclosurePanel,
  type DisclosurePanelProps,
  type DisclosureProps,
  Disclosure as RACDisclosure,
} from 'react-aria-components';

const disclosureButtonVariants = cva({
  base: 'inline-flex outline-none data-[focus-visible]:outline-focus',
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
      true: 'p-2 [&>svg]:h-7 [&>svg]:w-7',
      false: 'gap-2.5 px-4 py-2',
    },
  },
  defaultVariants: {
    size: 'regular',
    withChevron: false,
    isIconOnly: false,
  },
});

type DisclosureButtonProps = Omit<ButtonProps, 'slot' | 'children'> &
  VariantProps<typeof disclosureButtonVariants> & {
    children: React.ReactNode;
  };

const DisclosureButton = ({
  className,
  size,
  withChevron,
  isIconOnly,
  children,
  ...restProps
}: DisclosureButtonProps) => (
  <Button
    {...restProps}
    className={disclosureButtonVariants({
      className,
      size,
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

const Disclosure = (props: DisclosureProps) => <RACDisclosure {...props} />;

export {
  Disclosure,
  type DisclosureProps,
  DisclosureButton,
  type DisclosureButtonProps,
  DisclosurePanel,
  type DisclosurePanelProps,
};
