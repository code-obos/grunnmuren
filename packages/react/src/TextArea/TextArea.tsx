import { forwardRef, useRef } from 'react';
import { cx, composeRefs } from '@/utils';
import { useFallbackId } from '@/hooks';
import { Input, FormLabel, FormHelperText, FormErrorMessage } from '..';
import { useFormControlValidity } from '../hooks';

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  children?: never;
  /** Help text for the form control */
  description?: string;
  /** Error message for the form control */
  error?: string;
  /**  Label for the form control */
  label: string;
  /** Automatically valdiate the form control using the HTML constraint validation API. @default true */
  validate?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      description,
      error,
      id: idProp,
      label,
      required,
      validate = true,
      ...rest
    } = props;

    const ownRef = useRef(null);

    const { validity, validationMessage } = useFormControlValidity(
      ownRef,
      validate,
    );

    const id = useFallbackId(idProp);
    const helpTextId = id + 'help';
    const errorMsgId = id + 'err';

    const errorMsg = error ?? validationMessage;

    return (
      <div className="grid gap-2">
        <FormLabel
          htmlFor={id}
          isRequired={required}
          isInvalid={!!error || validity === 'invalid'}
        >
          {label}
        </FormLabel>

        <Input
          as="textarea"
          // @ts-expect-error fix this later
          ref={composeRefs(ownRef, ref)}
          id={id}
          required={required}
          {...rest}
          // for accessibility reasons these cannot be overriden
          isInvalid={!!error || validity === 'invalid'}
          aria-describedby={cx({
            [errorMsgId]: !!error,
            [helpTextId]: description,
          })}
        />

        {description && (
          <FormHelperText id={helpTextId}>{description}</FormHelperText>
        )}
        {errorMsg && (
          <FormErrorMessage id={errorMsgId}>{errorMsg}</FormErrorMessage>
        )}
      </div>
    );
  },
);
