/**
 * This is a modified version of the original file-trigger from react-aria-components.
 * We need to modify it to support it in forms.
 */
import { useObjectRef } from '@react-aria/utils';
import {
  Input,
  type FileTriggerProps as RACFileTriggerProps,
} from 'react-aria-components';
import { PressResponder } from '@react-aria/interactions';
import type { HTMLAttributes, RefObject } from 'react';
import type { FormValidationProps } from '@react-stately/form';

export type FileTriggerProps = Partial<FormValidationProps<File>> &
  RACFileTriggerProps &
  Omit<
    HTMLAttributes<HTMLInputElement>,
    'onSelect' | 'onChange' | 'required'
  > & {
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
    value,
    ...rest
  } = props;
  const inputRef = useObjectRef(ref);
  // const domProps = filterDOMProps(rest);

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
        style={{ display: 'none' }} // TODO: this gives an error in the console when attempting to submit a form with a required and empty file input
        accept={acceptedFileTypes?.toString()}
        onChange={(e) => onSelect?.(e.target.files)}
        capture={defaultCamera}
        multiple={allowsMultiple}
        // @ts-expect-error
        webkitdirectory={acceptDirectory ? '' : undefined}
      />
    </>
  );
};
