import { Children } from 'react';
import { cva, type VariantProps, cx } from 'cva';
import { useLocale, Button } from 'react-aria-components';
import {
  Close,
  ChevronDown,
  InfoCircle,
  CheckCircle,
  Warning,
  CloseCircle,
} from '@obosbbl/grunnmuren-icons-react';
import { useState } from 'react';

// TODO: add new icons
const iconMap = {
  info: InfoCircle,
  success: CheckCircle,
  warning: Warning,
  danger: CloseCircle,
};

const alertVariants = cva({
  base: [
    'grid items-center gap-2 rounded-md border-2 px-3 py-2',
    // Heading styles:
    '[&_[data-slot="heading"]]:text-base [&_[data-slot="heading"]]:font-medium [&_[data-slot="heading"]]:leading-7',
    // Content styles:
    '[&:has([data-slot="heading"])_[data-slot="content"]]:col-span-full [&_[data-slot="content"]]:text-sm [&_[data-slot="content"]]:leading-6',
    // Footer styles:
    '[&_[data-slot="footer"]]:col-span-full [&_[data-slot="footer"]]:text-xs [&_[data-slot="footer"]]:font-light [&_[data-slot="footer"]]:leading-6',
  ],
  variants: {
    /**
     * The variant of the alert
     * @default info
     */
    variant: {
      info: 'border-[#1A7FA7] bg-sky-light',
      success: 'border-[#0F9B6E] bg-mint-light',
      warning: 'border-[#C57C13] bg-[#FFF2DE]',
      danger: 'border-[#C0385D] bg-red-light',
    },
    isDismissable: {
      true: 'grid-cols-[auto_1fr_auto]',
      false: 'grid-cols-[auto_1fr]',
    },
  },
  defaultVariants: {
    variant: 'info',
    isDismissable: false,
  },
});

type Props = VariantProps<typeof alertVariants> & {
  children: React.ReactNode;
  /**
   * The ARIA role for the alertbox.
   */
  role: 'alert' | 'status' | 'none';
  /**
   * Controls if the alert is expandable or not
   * @default false
   */
  /** Additional CSS className for the element. */
  className?: string;
  isExpandable?: boolean;
  /**
   * Controls if the alert can be dismissed with a close button.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Controls if the alert is rendered or not.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  isDismissed?: boolean;
  /**
   * Callback that should be triggered when a dismissable alert is closed.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  onDismiss?: () => void;
};

const translations = {
  close: {
    nb: 'Lukk',
    nn: 'Lukk',
    sv: 'Stäng',
    en: 'Close',
  },
  showMore: {
    nb: 'Les mer',
    nn: 'Les meir',
    sv: 'Läs mer',
    en: 'Read more',
  },
  showLess: {
    nb: 'Vis mindre',
    nn: 'Vis mindre',
    sv: 'Dölj',
    en: 'Show less',
  },
};

type SupportedLocales = 'nb' | 'nn' | 'sv' | 'en';

const Alertbox = ({
  children,
  role,
  className,
  variant = 'info',
  isDismissable = false, // Assign default value to make cva variants apply correctly
  isDismissed: isControlledVisible,
  onDismiss,
  isExpandable,
}: Props) => {
  const Icon = iconMap[variant];

  const { locale } = useLocale();

  const [isUncontrolledVisible, setIsUncontrolledVisible] = useState(true);
  const isDismissed =
    isControlledVisible !== undefined
      ? isControlledVisible
      : isUncontrolledVisible;

  if (!isDismissed) return;

  const close = () => {
    setIsUncontrolledVisible(false);
    if (onDismiss) onDismiss();
  };

  const isInDevMode = process.env.NODE_ENV !== 'production';

  if (isInDevMode && onDismiss && !isDismissable) {
    console.warn(
      'Passing an `onDismiss` callback without setting the `isDismissable` prop to `true` will not have any effect.',
    );
  }

  if (isInDevMode && !children) {
    console.error('`No children was passed to the <AlertBox/>` component.');
    return;
  }

  const [firstChild, ...restChildren] = Children.toArray(children);
  const lastChild = restChildren.pop();

  return (
    <div
      className={alertVariants({
        className,
        variant,
        isDismissable,
      })}
      // The role prop is required to force consumers to consider and choose the appropriate alertbox role.
      // role="none" will not have any effect on a div, so it can be omitted.
      role={role === 'none' ? undefined : role}
    >
      <Icon />
      {firstChild}
      {isDismissable && (
        <Button
          className={cx(
            'grid h-11 w-11 place-items-center',
            // Focus styles:
            '-m-2 outline-transparent transition-[outline] duration-200 focus:-outline-offset-8 focus:outline-black',
          )}
          onPress={close}
          aria-label={translations.close[locale as SupportedLocales]}
        >
          <Close />
        </Button>
      )}
      {isExpandable ? (
        <details className="col-span-full [&:not([open])_[data-slot='show-less']]:hidden [&[open]_[data-slot='show-more']]:hidden [&[open]_summary_svg]:rotate-180 [&_[data-slot='content']]:mt-2">
          <summary
            className={cx(
              'relative -my-3 inline-flex cursor-pointer items-center gap-1 py-3 text-sm leading-6',
              // Focus styles:
              'outline-none after:absolute after:bottom-3 after:left-0 after:right-0 after:h-0 after:bg-transparent after:transition-all after:duration-200',
              'focus:after:h-[1px] focus:after:bg-black',
            )}
          >
            <span data-slot="show-more">
              {translations.showMore[locale as SupportedLocales]}
            </span>
            <span data-slot="show-less">
              {translations.showLess[locale as SupportedLocales]}
            </span>
            <ChevronDown className="transition-transform duration-150 motion-reduce:transition-none" />
          </summary>
          {restChildren}
        </details>
      ) : (
        restChildren
      )}
      {lastChild}
    </div>
  );
};

export { type Props as AlertboxProps, Alertbox };
