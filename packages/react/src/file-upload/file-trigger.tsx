import type { HTMLAttributes, RefObject } from 'react';
import { type FileTriggerProps as RACFileTriggerProps } from 'react-aria-components/FileTrigger';
import { Input } from 'react-aria-components/Input';
/**
 * This is a modified version of the original file-trigger from react-aria-components.
 * We need to modify it to support it in forms (e.g. adding a name prop).
 * We also modify the hiding of it, so that it works with the built in auto focusing of RAC.
 */
import { PressResponder } from 'react-aria/private/interactions/PressResponder';
import { useObjectRef } from 'react-aria/useObjectRef';
import type { useFormValidationState } from 'react-stately/private/form/useFormValidationState';

type FormValidationProps = Parameters<typeof useFormValidationState>[0];

export type FileTriggerProps = Partial<Omit<FormValidationProps, 'value'>> &
  RACFileTriggerProps &
  Omit<HTMLAttributes<HTMLInputElement>, 'onSelect' | 'onChange' | 'required' | 'className'> & {
    ref?: RefObject<HTMLInputElement | null>;
    isInvalid?: boolean;
    isRequired?: boolean;
  };

/**
 * A FileTrigger allows a user to access the file system with any pressable React Aria or React Spectrum component, or custom components built with usePress.
 */
export const FileTrigger = (props: FileTriggerProps) => {
  const {
    onSelect,
    acceptedFileTypes,
    allowsMultiple,
    defaultCamera,
    children,
    acceptDirectory,
    ref,
    isInvalid,
    isRequired,
    name,
    ...rest
  } = props;
  const inputRef = useObjectRef<HTMLInputElement>(ref);

  return (
    <>
      <PressResponder
        onPress={() => {
          if (inputRef.current?.value) {
            inputRef.current.value = '';
          }
          inputRef.current?.click();
        }}
      >
        {children}
      </PressResponder>
      <Input
        {...rest}
        required={isRequired}
        aria-invalid={isInvalid}
        data-invalid={isInvalid}
        data-rac
        name={Array.isArray(name) ? name.join(' ') : name}
        type="file"
        ref={inputRef}
        accept={acceptedFileTypes?.toString()}
        onChange={(e) => onSelect?.(e.target.files)}
        capture={defaultCamera}
        multiple={allowsMultiple}
        {...(acceptDirectory ? ({ webkitdirectory: '' } as Record<string, string>) : {})}
        // This is a work around to prevent error in the console when attempting to submit a form with a required and empty file input
        // RAC uses display: none, which prevents the file input from being focused.
        // What we do instead is to hide it visually using custom CSS, so that the native HTML validation messages are still hidden. Which is why
        // we don't use the sr-only class.
        className="absolute left-[-1000vw] opacity-0"
        // Finally, we add aria-hidden to prevent the file input from being read by screen readers
        aria-hidden
        // Prevent focus trap when tabbing (since focus is delegated to the button)
        tabIndex={-1}
        // We also attach an onFocus event listener to the file upload button (in the FileUpload component), which we use to delagate focus from this input to.
      />
    </>
  );
};
