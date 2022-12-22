import { createContext } from 'react';
import { noop } from '@/utils';

export const RadioContext = createContext<{
  defaultValue?: string;
  isControlled: boolean;
  name?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  required?: boolean;
  value?: string;
  error?: boolean;
}>({
  defaultValue: undefined,
  isControlled: false,
  name: undefined,
  onChange: noop,
  required: false,
  value: undefined,
  error: false,
});
