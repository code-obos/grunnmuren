'use client';
import { Button, type ButtonProps } from '@obosbbl/grunnmuren-react';
import type { AnyReactFormApi } from '@tanstack/react-form';
import type { ComponentProps, ReactNode } from 'react';

export type FormProps = Omit<ComponentProps<'form'>, 'noValidate' | 'children' | 'className'> & {
  children: ReactNode;
  /** Replaces the default grid layout class on the inner div (not the `<form>` element). */
  className?: string;
};

export type SubmitButtonProps = Omit<ButtonProps, 'type' | 'isPending' | 'href'>;

/** The form is read lazily, because the context hook only exists once the hook factory has run. */
export function createFormComponents(useFormContext: () => AnyReactFormApi) {
  function Form({ children, className = 'grid gap-6 md:gap-8', onSubmit, ...props }: FormProps) {
    const form = useFormContext();
    return (
      <form
        {...props}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(event);
          void form.handleSubmit();
        }}
      >
        <div className={className}>{children}</div>
      </form>
    );
  }

  // w-fit keeps the button from stretching across the Form's grid
  function SubmitButton(props: SubmitButtonProps) {
    const form = useFormContext();
    return (
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button
            {...({ ...props, className: props.className ?? 'w-fit' } as ButtonProps)}
            type="submit"
            isPending={isSubmitting}
          />
        )}
      </form.Subscribe>
    );
  }

  return { Form, SubmitButton };
}
