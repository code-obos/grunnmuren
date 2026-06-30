import { cva, cx, type VariantProps } from 'cva';
import {
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components/Modal';
import { Provider } from 'react-aria-components/slots';

import { HeaderContext } from '../content';

const drawerVariants = cva({
  base: ['fixed overflow-auto bg-white text-left shadow-xl', 'motion-reduce:animate-none'],
  variants: {
    placement: {
      right: 'top-0 right-0 h-dvh w-full max-w-md rounded-l-2xl',
      left: 'top-0 left-0 h-dvh w-full max-w-md rounded-r-2xl',
      top: 'inset-x-0 top-0 max-h-[80dvh] w-full rounded-b-2xl',
      bottom: 'inset-x-0 bottom-0 max-h-[80dvh] w-full rounded-t-2xl',
    },
    isEntering: {
      true: 'animate-in duration-300 ease-out',
    },
    isExiting: {
      true: 'animate-out duration-200 ease-in',
    },
  },
  compoundVariants: [
    { placement: 'right', isEntering: true, className: 'slide-in-from-right' },
    { placement: 'right', isExiting: true, className: 'slide-out-to-right' },
    { placement: 'left', isEntering: true, className: 'slide-in-from-left' },
    { placement: 'left', isExiting: true, className: 'slide-out-to-left' },
    { placement: 'top', isEntering: true, className: 'slide-in-from-top' },
    { placement: 'top', isExiting: true, className: 'slide-out-to-top' },
    { placement: 'bottom', isEntering: true, className: 'slide-in-from-bottom' },
    { placement: 'bottom', isExiting: true, className: 'slide-out-to-bottom' },
  ],
});

type DrawerProps = Omit<RACModalOverlayProps, 'isDismissable' | 'style'> &
  Pick<VariantProps<typeof drawerVariants>, 'placement'> & {
    /** Additional style properties for the element. */
    style?: React.CSSProperties;
    /** @default 10 Controls the z-index of the drawer overlay */
    zIndex?: number;
    /** @default true Makes the drawer dismissable */
    isDismissable?: boolean;
  };

const Drawer = ({
  isDismissable = true,
  isOpen,
  onOpenChange,
  defaultOpen,
  className,
  zIndex = 10,
  placement = 'right',
  style = {},
  ...restProps
}: DrawerProps) => {
  return (
    <Provider
      values={[
        [
          HeaderContext,
          {
            // Header renders the dismiss button itself; we only pass the close handler.
            _onClose: isDismissable ? () => onOpenChange?.(false) : undefined,
          },
        ],
      ]}
    >
      <RACModalOverlay
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        defaultOpen={defaultOpen}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={!isDismissable}
        style={{ zIndex, ...style }}
        className={({ isEntering, isExiting }) =>
          cx(
            'fixed inset-0 bg-black/25 backdrop-blur-sm',
            isEntering && 'fade-in animate-in duration-300 ease-out',
            isExiting && 'fade-out animate-out duration-200 ease-in',
            // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
            'motion-reduce:animate-none',
          )
        }
      >
        <RACModal
          {...restProps}
          className={({ isEntering, isExiting }) =>
            drawerVariants({ placement, isEntering, isExiting, className })
          }
        />
      </RACModalOverlay>
    </Provider>
  );
};

export { Drawer as UNSAFE_Drawer, type DrawerProps as UNSAFE_DrawerProps };
