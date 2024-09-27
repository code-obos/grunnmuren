import { Children, useId } from 'react';
import { cva, type VariantProps, cx } from 'cva';
import { useLocale } from 'react-aria-components';
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
    'grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border-2 px-3 py-2',
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
  },
  defaultVariants: {
    variant: 'info',
  },
});

type Props = VariantProps<typeof alertVariants> & {
  children: React.ReactNode;
  /**
   * The ARIA role for the alertbox.
   */
  role: 'alert' | 'status' | 'none';
  /** Additional CSS className for the element. */
  className?: string;
  /**
   * Controls if the alert is expandable or not
   * @default false
   */
  isExpandable?: boolean;
  /**
   * Controls if the alert can be dismissed with a close button.
   * @default false
   */
  isDismissable?: boolean;
  /**
   * Controls if the alert is rendered or not.
   * This is used to control the open/closed state of the component; make the component "controlled".
   * @default false
   */
  isDismissed?: boolean;
  /**
   * Callback that should be triggered when a dismissable alert is closed.
   * This is used to control the open/closed state of the component; make the component "controlled".
   */
  onDismiss?: () => void;
};

type SupportedLocales = 'nb' | 'sv' | 'en';

type Translation = {
  [key in SupportedLocales]: string;
};

type Translations = {
  [x: string]: Translation;
};

const translations: Translations = {
  close: {
    nb: 'Lukk',
    sv: 'Stäng',
    en: 'Close',
  },
  showMore: {
    nb: 'Les mer',
    sv: 'Läs mer',
    en: 'Read more',
  },
  showLess: {
    nb: 'Vis mindre',
    sv: 'Dölj',
    en: 'Show less',
  },
};

type SupportedLocale = ReturnType<typeof useLocale> & {
  locale: SupportedLocales;
};

const Alertbox = ({
  children,
  role,
  className,
  variant = 'info',
  isDismissable = false, // Assign default value to make cva variants apply correctly
  isDismissed,
  onDismiss,
  isExpandable,
}: Props) => {
  const Icon = iconMap[variant];

  const { locale } = useLocale() as SupportedLocale;

  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const isCollapsed = isExpandable && !isExpanded;

  const [isUncontrolledVisible, setIsUncontrolledVisible] = useState(true);
  const isVisible =
    isDismissed !== undefined ? !isDismissed : isUncontrolledVisible;

  if (!isVisible) return;

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
      })}
      // The role prop is required to force consumers to consider and choose the appropriate alertbox role.
      // role="none" will not have any effect on a div, so it can be omitted.
      role={role === 'none' ? undefined : role}
    >
      <Icon />
      {firstChild}
      {isDismissable && (
        <button
          className={cx(
            '-m-2 grid h-11 w-11 place-items-center rounded-xl',
            'focus:outline-none focus:-outline-offset-8 focus:outline-black',
          )}
          onClick={close}
          aria-label={translations.close[locale]}
        >
          <Close />
        </button>
      )}
      {isExpandable && (
        <button
          className={cx(
            'relative col-span-full row-start-2 -my-3 inline-flex max-w-fit cursor-pointer items-center gap-1 py-3 text-sm leading-6',
            // Focus styles:
            'outline-none after:absolute after:bottom-3 after:left-0 after:right-0 after:h-0 after:transition-all after:duration-200',
            'focus:after:h-[1px] focus:after:bg-black',
          )}
          onClick={() => setIsExpanded((prevState) => !prevState)}
          aria-expanded={isExpanded}
          aria-controls={id}
        >
          {isExpanded
            ? translations.showLess[locale]
            : translations.showMore[locale]}
          <ChevronDown
            className={cx(
              'transition-transform duration-150 motion-reduce:transition-none',
              isExpanded && 'rotate-180',
            )}
          />
        </button>
      )}
      {!isCollapsed && restChildren.length > 0 && (
        <div className="col-span-full grid gap-y-4" id={id}>
          {restChildren}
        </div>
      )}
      {lastChild}
    </div>
  );
};

export { type Props as AlertboxProps, Alertbox };
