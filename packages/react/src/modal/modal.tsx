import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  ButtonContext,
  DEFAULT_SLOT,
  Provider,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components';
import { Button } from '../button';

type DialogTriggerProps = RACDialogTriggerProps;

const DialogTrigger = (props: DialogTriggerProps) => (
  <RACDialogTrigger {...props} />
);

type ModalOverlayProps = Omit<RACModalOverlayProps, 'isDismissable'>;

const ModalOverlay = (props: ModalOverlayProps) => (
  <RACModalOverlay
    {...props}
    isDismissable
    className={({ isEntering, isExiting }) =>
      cx(
        'fixed inset-0 z-10 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur',
        isEntering && 'fade-in animate-in duration-300 ease-out',
        isExiting && 'fade-out animate-out duration-200 ease-in',
        // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
        'motion-reduce:animate-none',
      )
    }
  />
);

type ModalProps = Omit<RACModalOverlayProps, 'isDismissable'>;

const Modal = ({ className, ...restProps }: ModalProps) => (
  <ModalOverlay>
    <RACModal
      {...restProps}
      className={({ isEntering, isExiting }) =>
        cx(
          className,
          'w-full max-w-md overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl',
          isEntering && 'zoom-in-95 animate-in duration-300 ease-out',
          isExiting && 'zoom-out-95 animate-out duration-200 ease-in',
          // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
          'motion-reduce:animate-none',
        )
      }
    />
  </ModalOverlay>
);

type DialogProps = RACDialogProps & {
  children: React.ReactNode;
};

const Dialog = ({ className, children, ...restProps }: DialogProps) => (
  <RACDialog
    {...restProps}
    className={cx(
      'relative grid gap-y-5 outline-none',
      // Title
      '[&_[slot="title"]]:heading-s [&_[slot="title"]]:pr-14',
      // Footer
      '[&_[data-slot="footer"]]:flex [&_[data-slot="footer"]]:gap-x-2',
    )}
  >
    {({ close }) => (
      <>
        <Provider
          values={[
            [
              ButtonContext,
              {
                // This is necessary to support multiple close buttons
                slots: {
                  // We need to define default slot in order to also support non-slotted buttons (i.e. buttons without slot prop)
                  [DEFAULT_SLOT]: {
                    className: 'w-fit',
                  },
                  close: {
                    onPress: close,
                    className: 'w-fit',
                  },
                },
              },
            ],
          ]}
        >
          {children}
        </Provider>
        <Button
          slot="close" // RAC Dialog suppors one close button out of the box, so we utilize that here. For other close buttons we use ButtonContext
          variant="tertiary"
          className="-mt-3 !px-2.5 absolute top-0 right-0 data-[focus-visible]:outline-focus-inset"
        >
          <Close />
        </Button>
      </>
    )}
  </RACDialog>
);

export {
  type DialogTriggerProps as UNSAFE_DialogTriggerProps,
  DialogTrigger as UNSAFE_DialogTrigger,
  type ModalProps as UNSAFE_ModalProps,
  Modal as UNSAFE_Modal,
  type DialogProps as UNSAFE_DialogProps,
  Dialog as UNSAFE_Dialog,
};
