import { cx } from 'cva';
import { createContext, type HTMLProps } from 'react';
import {
  type ContextValue,
  Provider,
  ProgressBar as RACProgressBar,
  type ProgressBarProps as RACProgressBarProps,
  useContextProps,
} from 'react-aria-components';

type ProgressBarProps = RACProgressBarProps;

type ProgressBarValueTextProps = HTMLProps<HTMLSpanElement> & {
  className?: string;
};

export const _ProgressBarValueTextContext = createContext<
  ContextValue<ProgressBarValueTextProps, HTMLSpanElement>
>({});

const ProgressBarValueText = ({
  ref: _ref,
  ..._props
}: ProgressBarValueTextProps) => {
  const [props, ref] = useContextProps(
    _props,
    _ref,
    _ProgressBarValueTextContext,
  );
  const { children, ...restProps } = props;
  return (
    <span {...restProps} ref={ref}>
      {children}
    </span>
  );
};

const ProgressBar = ({
  children,
  className,
  ...restProps
}: ProgressBarProps) => {
  return (
    <RACProgressBar {...restProps} className={cx(className, 'max-w-full')}>
      {({ percentage, valueText, ...restArgs }) => (
        <Provider
          values={[[_ProgressBarValueTextContext, { children: valueText }]]}
        >
          {typeof children === 'function'
            ? children({ percentage, valueText, ...restArgs })
            : children}
          <div className="relative h-0.75 rounded bg-gray-light">
            <div
              className="h-0.75 rounded bg-blue-dark transition-all duration-300 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </Provider>
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
