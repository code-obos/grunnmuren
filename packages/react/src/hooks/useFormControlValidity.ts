import { useState, useEffect, RefObject } from 'react';

type Validity = 'indeterminate' | 'invalid' | 'valid';

/**
 * Browser validation as it should be. "Invalid" only triggers after the user has blurred an input, or attempted
 * to submit the form.
 *
 * NB! Currently this only works with uncontrolled components
 */
export function useFormControlValidity(
  ref: RefObject<HTMLElement & { checkValidity(): boolean }>,
) {
  const [validity, setValidity] = useState<Validity>('indeterminate');

  const onBlur = (event: FocusEvent) => {
    // this triggers an invalid event, so if it's invalid it's handled by the `onInvalid` handler
    const isValid = (event.target as HTMLInputElement).checkValidity();

    if (isValid) {
      setValidity('valid');
    }
  };

  const onInput = (event: Event) => {
    if (validity !== 'indeterminate') {
      // this triggers an invalid event, so if it's invalid it's handled by the `onInvalid` handler
      const isValid = (event.target as HTMLInputElement).checkValidity();

      if (isValid) {
        setValidity('valid');
      }
    }
  };

  const onInvalid = (/*event: Event*/) => {
    setValidity('invalid');
  };

  useEffect(() => {
    const { current } = ref;
    current?.addEventListener('blur', onBlur);
    current?.addEventListener('input', onInput);
    current?.addEventListener('invalid', onInvalid);

    return () => {
      current?.removeEventListener('blur', onBlur);
      current?.removeEventListener('input', onInput);
      current?.removeEventListener('invalid', onInvalid);
    };
  });

  return { validity };
}
