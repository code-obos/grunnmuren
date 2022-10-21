import { useState, useEffect, RefObject, useCallback } from 'react';

type Validity = 'indeterminate' | 'invalid' | 'valid';

/**
 * Browser validation as it should be. "Invalid" only triggers after the user has blurred an input, or attempted
 * to submit the form.
 *
 * NB! Currently this only works with uncontrolled components
 */
export function useFormControlValidity(
  ref: RefObject<HTMLElement & { checkValidity(): boolean }>,
  enabled = true,
) {
  const [validity, setValidity] = useState<Validity>('indeterminate');
  const [validationMessage, setValidationMessage] = useState<string>();

  const onBlur = useCallback((event: FocusEvent) => {
    // this triggers an invalid event, so if it's invalid it's handled by the `onInvalid` handler
    const isValid = (event.target as HTMLInputElement).checkValidity();

    if (isValid) {
      setValidity('valid');
      setValidationMessage(undefined);
    }
  }, []);

  const onInput = useCallback(
    (event: Event) => {
      if (validity !== 'indeterminate') {
        // this triggers an invalid event, so if it's invalid it's handled by the `onInvalid` handler
        const isValid = (event.target as HTMLInputElement).checkValidity();

        if (isValid) {
          setValidity('valid');
          setValidationMessage(undefined);
        }
      }
    },
    [validity],
  );

  const onInvalid = useCallback((event: Event) => {
    event.preventDefault();
    const message = (event.target as HTMLInputElement).validationMessage;
    setValidationMessage(message);
    setValidity('invalid');
  }, []);

  useEffect(() => {
    const { current } = ref;

    if (
      enabled &&
      // @ts-expect-error respect the <form noValidate> attribute if we are rendered inside a form
      current?.form?.noValidate !== true
    ) {
      current?.addEventListener('blur', onBlur);
      current?.addEventListener('input', onInput);
      current?.addEventListener('invalid', onInvalid);
    }

    return () => {
      current?.removeEventListener('blur', onBlur);
      current?.removeEventListener('input', onInput);
      current?.removeEventListener('invalid', onInvalid);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, onInput]);

  return { validity, validationMessage };
}
