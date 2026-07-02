import { Close } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';
import { useContext } from 'react';
import { ButtonContext as RACButtonContext } from 'react-aria-components/Button';
import {
  OverlayTriggerStateContext,
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  DialogTrigger as RACDialogTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
} from 'react-aria-components/Dialog';
import { HeadingContext as RACHeadingContext } from 'react-aria-components/Heading';
import {
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  type ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components/Modal';
import { DEFAULT_SLOT, Provider, useSlottedContext } from 'react-aria-components/slots';

import { ButtonContext } from '../button';
import { HeaderContext, HeadingContext } from '../content';
import { translations } from '../translations';
import { useLocale } from '../use-locale';

type DialogTriggerProps = RACDialogTriggerProps;

const DialogTrigger = (props: DialogTriggerProps) => <RACDialogTrigger {...props} />;

type ModalOverlayProps = Omit<RACModalOverlayProps, 'isDismissable' | 'style'> & {
  /** Additional style properties for the element. */
  style?: React.CSSProperties;
  /** @default 10 Controls the z-index of the modal overlay */
  zIndex?: number;
  /** @default true Makes the modal dismissable */
  isDismissable?: boolean;
  /** @default false When true, the modal takes up the full screen */
  fullscreen?: boolean;
};

const _ModalOverlay = ({
  style = {},
  zIndex = 10,
  fullscreen,
  ...restProps
}: ModalOverlayProps) => (
  <RACModalOverlay
    {...restProps}
    className={({ isEntering, isExiting }) =>
      cx(
        'fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 text-center backdrop-blur-sm',
        !fullscreen && 'p-4',
        isEntering && 'fade-in animate-in duration-300 ease-out',
        isExiting && 'fade-out animate-out duration-200 ease-in',
        // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
        'motion-reduce:animate-none',
      )
    }
    style={{ zIndex, ...style }}
  />
);

type ModalProps = ModalOverlayProps;

const Modal = ({
  isDismissable = true,
  isOpen,
  onOpenChange,
  defaultOpen,
  className,
  zIndex,
  fullscreen = false,
  ...restProps
}: ModalProps) => (
  <_ModalOverlay
    isOpen={isOpen}
    onOpenChange={onOpenChange}
    defaultOpen={defaultOpen}
    isDismissable={isDismissable}
    isKeyboardDismissDisabled={!isDismissable}
    zIndex={zIndex}
    fullscreen={fullscreen}
  >
    <RACModal
      {...restProps}
      className={({ isEntering, isExiting }) =>
        cx(
          className,
          'overflow-auto bg-white text-left shadow-xl',
          fullscreen ? 'fixed inset-0' : 'w-full max-w-md rounded-2xl align-middle',
          isEntering && 'zoom-in-95 animate-in duration-300 ease-out',
          isExiting && 'zoom-out-95 animate-out duration-200 ease-in',
          // Using the motion-safe class does not work, so we use motion-reduce to overwrite instead
          'motion-reduce:animate-none',
        )
      }
    />
  </_ModalOverlay>
);

/**
 * Rendered inside RACDialog (where React Aria exposes the generated title id via
 * its HeadingContext). Builds the contexts the header content needs and hands them
 * to `Header` through `HeaderContext`, so `Header` only has to render a `Provider`
 * around its own children — no knowledge of the dialog, close icon or locale.
 */
const HeaderTitle = ({ children }: { children: React.ReactNode }) => {
  const racTitle = useSlottedContext(RACHeadingContext, 'title');
  const locale = useLocale();
  return (
    <Provider
      values={[
        [
          HeaderContext,
          {
            _providerValues: [
              [HeadingContext, { className: 'heading-s', id: racTitle?.id }],
              [
                ButtonContext,
                {
                  slots: {
                    [DEFAULT_SLOT]: {},
                    // Appearance for a bare `<Button slot="close" />`; the close
                    // behaviour (onPress) comes from the Dialog's ButtonContext below.
                    close: {
                      variant: 'tertiary',
                      'aria-label': translations.close[locale],
                      className: 'data-focus-visible:outline-focus-inset px-2.5!',
                      children: <Close />,
                    },
                  },
                },
              ],
            ],
          },
        ],
      ]}
    >
      {children}
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
      className,
      'relative flex flex-col gap-y-5 p-4 outline-none',
      // Header
      '**:data-[slot="header"]:flex **:data-[slot="header"]:items-center **:data-[slot="header"]:justify-between **:data-[slot="header"]:gap-x-2',
      // Footer
      '**:data-[slot="footer"]:flex **:data-[slot="footer"]:gap-x-2',
    )}
  >
    {({ close }) => (
      <Provider
        values={[
          [
            RACButtonContext,
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
        <HeaderTitle>{children}</HeaderTitle>
      </Provider>
    )}
  </RACDialog>
);

/**
 * Reset the ButtonContext from react-aria-components that Dialog provides
 * (only allows "close" slot) so nested components can set up their own
 * button slots (e.g. Carousel's "prev" / "next").
 */
export const _ModalButtonContextReset = ({ children }: { children: React.ReactNode }) => {
  const isInsideOverlay = !!useContext(OverlayTriggerStateContext);
  return isInsideOverlay ? (
    <Provider values={[[RACButtonContext, null]]}>{children}</Provider>
  ) : (
    children
  );
};

export {
  Dialog as UNSAFE_Dialog,
  DialogTrigger as UNSAFE_DialogTrigger,
  Modal as UNSAFE_Modal,
  type DialogProps as UNSAFE_DialogProps,
  type DialogTriggerProps as UNSAFE_DialogTriggerProps,
  type ModalProps as UNSAFE_ModalProps,
};
