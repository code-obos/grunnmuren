import { type EffectCallback, useEffect } from 'react';

export function useComponentDidMount(callback: EffectCallback) {
  useEffect(callback, []);
}
