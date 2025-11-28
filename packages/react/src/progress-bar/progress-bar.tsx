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

const ProgressBarValueText = (props: ProgressBarValueTextProps) => {
  const value = useContext(_ProgressBarValueTextContext);
  return (
    value && (
      <span {...props} data-slot="progress-bar-value-text">
        {value}
      </span>
    )
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
          <div className="relative h-0.75 rounded bg-gray-light">
            <div
              className="h-0.75 rounded bg-blue-dark transition-all duration-300 ease-in-out"
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
