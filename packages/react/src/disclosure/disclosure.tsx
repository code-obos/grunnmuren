import { cva, type VariantProps } from 'cva';
import {
  Button,
  type ButtonProps,
  type DisclosureProps,
  Disclosure as RACDisclosure,
  DisclosurePanel,
  type DisclosurePanelProps,
} from 'react-aria-components';

type DisclosureButtonProps = Omit<ButtonProps, 'slot'>;

const disclosureButtonVariants = cva({
  base: 'focus-visible:outline-focus',
  variants: {
    variant: {
      dense: '-m-6 p-6',
    },
  },
});

const DisclosureButton = ({
  className,
  variant,
  ...restProps
}: DisclosureButtonProps & VariantProps<typeof disclosureButtonVariants>) => (
  <Button
    {...restProps}
    className={disclosureButtonVariants({ className, variant })}
    slot="trigger"
  />
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
