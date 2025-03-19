import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import {
  DialogTrigger as RACDialogTrigger,
  ModalOverlay as RACModalOverlay,
  type DialogTriggerProps as RACDialogTriggerProps,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  Modal as RACModal,
  type ModalOverlayProps as RACModalOverlayProps,
  Provider,
  ButtonContext,
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
    <Button
      slot="close"
      variant="tertiary"
      className="-mt-3 !px-2.5 absolute top-0 right-0 data-[focus-visible]:outline-focus-inset"
    >
      <Close />
    </Button>
    <Provider values={[[ButtonContext, { className: 'w-fit' }]]}>
      {children}
    </Provider>
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
