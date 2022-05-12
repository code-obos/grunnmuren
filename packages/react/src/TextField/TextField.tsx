import { forwardRef, useRef } from 'react';
import classNames from 'clsx';
import { Input, FormLabel, FormHelperText, FormErrorMessage } from '..';
import {
  useComposedRefs,
  useFallbackId,
  useFormControlValidity,
} from '../hooks';

export interface TextFieldProps
  extends React.ComponentPropsWithoutRef<'input'> {
  children?: never;
  /** Help text for the form control */
  description?: string;
  /** Error message for the form control */
  error?: string;
  /**  Label for the form control */
  label: string;
  prefix?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      description,
      error,
      id: idProp,
      label,
      required,
      type = 'text',
      ...rest
    } = props;

    const ownRef = useRef(null);

    const { validity } = useFormControlValidity(ownRef);

    const id = useFallbackId(idProp);
    const helpTextId = id + '-help';
    const errorMsgId = id + '-err';

    return (
      <div className="grid gap-2">
        <FormLabel htmlFor={id} isRequired={required}>
          {label}
        </FormLabel>

        <Input
          id={id}
          required={required}
          ref={useComposedRefs(ownRef, ref)}
          type={type}
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
