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
  base: 'outline-none data-[focus-visible]:outline-focus',
  variants: {
    variant: {
      dense: '-m-2.5 p-2.5 data-[focus-visible]:outline-offset-[-0.625rem]',
      regular: 'data-[focus-visible]:outline-inset min-h-11 min-w-11',
    },
    withChevron: {
      true: '[&[aria-expanded="true"]_svg]:rotate-180',
      false: null,
    },
  },
});

type DisclosureButtonProps = Omit<ButtonProps, 'slot' | 'children'> &
  VariantProps<typeof disclosureButtonVariants> & {
    children: React.ReactNode;
  };

const DisclosureButton = ({
  className,
  variant = 'regular',
  withChevron,
  children,
  ...restProps
}: DisclosureButtonProps) => (
  <Button
    {...restProps}
    className={disclosureButtonVariants({ className, variant, withChevron })}
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
