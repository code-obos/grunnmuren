export type OmitRACStyleProps<T> = Omit<T, 'style' | 'className'> & {
  /** The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. */
  className?: string;
  /** The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. */
  style?: React.CSSProperties;
};
