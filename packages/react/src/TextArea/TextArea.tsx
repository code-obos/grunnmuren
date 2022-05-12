import { forwardRef, useRef } from 'react';
import classNames from 'clsx';
import { Input, FormLabel, FormHelperText, FormErrorMessage } from '..';
import {
  useComposedRefs,
  useFallbackId,
  useFormControlValidity,
} from '../hooks';

export interface TextAreaProps
  extends React.ComponentPropsWithoutRef<'textarea'> {
  children?: never;
  /** Help text for the form control */
  description?: string;
  /** Error message for the form control */
  error?: string;
  /**  Label for the form control */
  label: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { description, error, id: idProp, label, required, ...rest } = props;

    const ownRef = useRef(null);

    const { validity } = useFormControlValidity(ownRef);

    const id = useFallbackId(idProp);
    const helpTextId = id + '-help';
    const errorMsgId = id + '-err-msg';

    return (
      <div className="grid gap-2">
        <FormLabel htmlFor={id} isRequired={required}>
          {label}
        </FormLabel>

        {/* @ts-expect-error TODO: Add support to Input for `as` prop so this typechecks okay */}
        <Input
          as="textarea"
          ref={useComposedRefs(ownRef, ref)}
          id={id}
          required={required}
          {...rest}
          // for accessibility reasons these cannot be overriden
          isInvalid={!!error || validity === 'invalid'}
          aria-describedby={classNames({
            [errorMsgId]: !!error,
            [helpTextId]: description,
          })}
        />

        {description && (
          <FormHelperText id={helpTextId}>{description}</FormHelperText>
        )}
        {error && <FormErrorMessage id={errorMsgId}>{error}</FormErrorMessage>}
      </div>
    );
  },
);
