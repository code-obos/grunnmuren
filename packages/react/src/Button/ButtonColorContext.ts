import { createContext } from 'react';
import type { ButtonColor } from '.';

export const ButtonColorContext = createContext<ButtonColor>('standard');
