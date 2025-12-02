import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import type { RefAttributes } from 'react';
import {
  ButtonContext,
  DEFAULT_SLOT,
  ModalContext,
  Provider,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
  useContextProps,
} from 'react-aria-components';
import { Button } from '../button';
import { HeadingContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type DialogTriggerProps = RACDialogTriggerProps;

const DialogTrigger = (props: DialogTriggerProps) => (
  <RACDialogTrigger {...props} />
);

type ModalOverlayProps = RACModalOverlayProps & {
  /** @default 10 Controls the z-index of the modal overlay */
  zIndex?: number;
};

const ModalOverlay = ({
  className,
  style = {},
  zIndex = 10,
  ...restProps
}: ModalOverlayProps) => (
  <Provider
    values={[
      [
        ModalContext,
        {
          isDismissable: restProps.isDismissable, // Force forward isDismissable to any Modal children, as RACModalOverlay does not do this automatically
        },
      ],
    ]}
  >
    <RACModalOverlay
      {...restProps}
      className={({ isEntering, isExiting }) =>
        cx(
          className,
          'fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur-sm',
          isEntering && 'fade-in animate-in duration-300 ease-out',
          isExiting && 'fade-out animate-out duration-200 ease-in',
          // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
          'motion-reduce:animate-none',
        )
      }
      style={{ zIndex, ...style }}
    />
  </Provider>
);

type ModalProps = RACModalOverlayProps & RefAttributes<HTMLDivElement>;

const Modal = ({ ref: _ref, ..._props }: ModalProps) => {
  const locale = useLocale();
  const [props, ref] = useContextProps(_props, _ref, ModalContext);
  const { isDismissable, className, ...restProps } = props;
  return (
    <Provider
      values={[
        [
          HeadingContext,
          {
            slots: {
              [DEFAULT_SLOT]: {}, // RAC requires a default slot in order to support non-slotted components
              title: {
                className: 'heading-s',
                _outerWrapper: (children) => (
                  <div className="flex items-center justify-between gap-x-2">
                    {children}
                    {isDismissable && (
                      <Button
                        slot="close" // RAC Dialog supports one close button out of the box, so we utilize that here. For other close buttons we use ButtonContext
                        variant="tertiary"
                        className="!px-2.5 data-focus-visible:outline-focus-inset"
                        aria-label={translations.close[locale]}
                      >
                        <Close />
                      </Button>
                    )}
                  </div>
                ),
              },
            },
          },
        ],
      ]}
    >
      <RACModal
        {...restProps}
        ref={ref}
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
    </Provider>
  );
};

type DialogProps = RACDialogProps & {
  children: React.ReactNode;
};

const Dialog = ({ className, children, ...restProps }: DialogProps) => (
  <RACDialog
    {...restProps}
    className={cx(
      'relative grid gap-y-5 outline-none',
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
      </>
    )}
  </RACDialog>
);

export {
  Dialog as UNSAFE_Dialog,
  DialogTrigger as UNSAFE_DialogTrigger,
  Modal as UNSAFE_Modal,
  ModalOverlay as UNSAFE_ModalOverlay,
  type ModalOverlayProps as UNSAFE_ModalOverlayProps,
  type DialogProps as UNSAFE_DialogProps,
  type DialogTriggerProps as UNSAFE_DialogTriggerProps,
  type ModalProps as UNSAFE_ModalProps,
};
