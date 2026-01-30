import { cx } from 'cva';
import { createContext, type HTMLProps, useContext } from 'react';
import {
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
} from 'react-aria-components';

type ProgressBarProps = RACProgressBarProps;

type ProgressBarValueTextProps = Omit<
  HTMLProps<HTMLSpanElement>,
  'children'
> & {
  className?: string;
};

export const _ProgressBarValueTextContext = createContext<string | undefined>(
  undefined,
);

const _ProgressBarValueTextProvider = _ProgressBarValueTextContext.Provider;

const ProgressBarValueText = ({
  className,
  ...restProps
}: ProgressBarValueTextProps) => {
  const value = useContext(_ProgressBarValueTextContext);
  return (
    <span
      {...restProps}
      className={cx(className, 'px-2 leading-7')}
      data-slot="progress-bar-value-text"
    >
      {value}
    </span>
  );
};

const ProgressBar = ({
  children,
  className,
  ...restProps
}: ProgressBarProps) => {
  return (
    <RACProgressBar
      data-slot="progress-bar"
      {...restProps}
      className={cx(className, 'max-w-full')}
    >
      {({ percentage, valueText, ...restArgs }) => (
        <_ProgressBarValueTextProvider value={valueText}>
          {typeof children === 'function'
            ? children({ percentage, valueText, ...restArgs })
            : children}
          <div className="relative rounded border border-blue-dark bg-gray-light">
            <div
              className="h-1 rounded bg-blue-dark transition-all duration-300 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </_ProgressBarValueTextProvider>
      )}
    </RACProgressBar>
  );
};

export {
  ProgressBar as UNSAFE_ProgressBar,
  ProgressBarValueText as UNSAFE_ProgressBarValueText,
  type ProgressBarProps as UNSAFE_ProgressBarProps,
  type ProgressBarValueTextProps as UNSAFE_ProgressBarValueTextProps,
};
