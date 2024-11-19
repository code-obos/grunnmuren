'use client';
import type { ReactNode } from 'react';
import { useDateFormatter, type DateFormatterOptions } from 'react-aria';

type DateFormatterProps = {
  value: Date | string;
  options?: DateFormatterOptions;
  /** Callback to customize the rendering of the date */
  children?: (formattedDate: string) => ReactNode;
};

/**
 * A React component that wraps https://react-spectrum.adobe.com/react-aria/useDateFormatter.html
 * By default it sets the timeZone to `Europe/Berlin` to prevent the server's timezone from affecting
 * the localized format
 */
const DateFormatter = ({
  options: _options,
  value,
  children: render,
}: DateFormatterProps) => {
  const options = {
    timeZone: 'Europe/Berlin',
    ..._options,
  };
  const formatter = useDateFormatter(options);

  const date = typeof value === 'string' ? new Date(value) : value;

  const formatted = formatter.format(date);

  return render ? render(formatted) : formatted;
};

export { DateFormatter, type DateFormatterProps };
