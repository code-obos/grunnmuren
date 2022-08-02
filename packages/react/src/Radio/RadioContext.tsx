import { createContext } from 'react';

export const RadioContext = createContext<{
  defaultValue?: string;
  isControlled: boolean;
  name?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  required?: boolean;
  value?: string;
}>({
  defaultValue: undefined,
  isControlled: false,
  name: undefined,
  onChange() {},
  required: false,
  value: undefined,
});
