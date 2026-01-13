import { useRef } from 'react';
import { useComponentDidMount } from './use-component-did-mount';

/**
 * Helper function to create the event listener and add it it the document
 * @param element The element to check if the click was outside of
 * @param onClickOutsideCallback The callback to run if the click was outside of the element
 * @returns The event handler function that was added to the document
 */
function createClickOutsideEventListener(
  element: HTMLElement | SVGSVGElement | null,
  onClickOutsideCallback: () => void,
) {
  const clickOutsideHandler = ({ target }: MouseEvent) => {
    if (!element?.contains(target as Node | null)) {
      onClickOutsideCallback();
    }
  };
  document.addEventListener('click', clickOutsideHandler);

  return clickOutsideHandler;
}

/**
 * Adds an event listener to the document that checks if a click was outside of the element when the component mounts.
 * This hook is useful for dropdowns and other components that should close when the user clicks outside of them.
 * This hook does not react to changes in the `onClickOutside` callback or component state.
 * If you need to react to changes in the callback or component state, use the `useClickOutsideRefEffect` hook instead.
 * @param onClickOutside The callback to run if the click was outside of the element
 * @returns A ref that must be passed to the JSX element you wish to detect click events outside of
 */
export function useClickOutsideRef<T extends HTMLElement | SVGSVGElement>(
  onClickOutside: () => void,
) {
  const htmlElementRef = useRef<T>(null);

  useComponentDidMount(() => {
    const clickOutsideHandler = createClickOutsideEventListener(
      htmlElementRef.current,
      onClickOutside,
    );
    return () => document.removeEventListener('click', clickOutsideHandler);
  });
  return htmlElementRef;
}
