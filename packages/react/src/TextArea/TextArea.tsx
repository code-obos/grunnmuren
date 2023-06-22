import { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { cx } from '@/utils';
import { useFallbackId } from '@/hooks';
import { Input, FormLabel, FormHelperText, FormErrorMessage } from '..';
import { useFormControlValidity } from '../hooks';

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  children?: never;
  /** Help text for the form control */
  description?: React.ReactNode;
  /** Error message for the form control */
  error?: string;
  /**  Label for the form control */
  label: string;
  /** @deprecated. use `disableValidation` instead */
  validate?: never;
  /** Disables the built in HTML5 validation. If using custom validation for an entire form, consider setting `noValidate` on the form element instead. @default false */
  disableValidation?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      description,
      error,
      id: idProp,
      label,
      disableValidation = false,
      ...rest
    } = props;

    const ownRef = useRef(null);

    const multiRef = mergeRefs([ownRef, ref]);

    const { validity, validationMessage } = useFormControlValidity(
      ownRef,
      !disableValidation,
    );

    const id = useFallbackId(idProp);
    const helpTextId = id + 'help';
    const errorMsgId = id + 'err';

    const errorMsg = error || validationMessage;

    return (
      <div className="grid gap-2">
        <FormLabel
          htmlFor={id}
          isRequired={props.required}
          isInvalid={!!error || validity === 'invalid'}
        >
          {label}
        </FormLabel>

        {description && (
          <FormHelperText id={helpTextId}>{description}</FormHelperText>
        )}

        <Input
          as="textarea"
          // @ts-expect-error fix this later
          ref={multiRef}
          id={id}
          {...rest}
          // for accessibility reasons these cannot be overriden
          isInvalid={!!error || validity === 'invalid'}
          aria-describedby={
            cx({
              [errorMsgId]: errorMsg,
              [helpTextId]: description,
            }) || undefined
          }
        />

        {errorMsg && (
          <FormErrorMessage id={errorMsgId}>{errorMsg}</FormErrorMessage>
        )}
      </div>
    );
  },
);
