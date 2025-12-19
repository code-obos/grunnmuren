import type { Ref } from 'react';

/** Omits style and className from RAC, as they are render props, which doesn't work well with our own classes for the components */
export type RACTypeHelper<T, K> = Omit<
  T,
  'children' | 'style' | 'className'
> & {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
  className?: string;
  /** The children of the component. */
  children?: React.ReactNode;
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
  style?: React.CSSProperties;
  ref?: Ref<K>;
};
