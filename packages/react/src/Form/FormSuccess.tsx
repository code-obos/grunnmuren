import classNames from 'clsx';

export interface FormSuccessProps
  extends React.ComponentPropsWithoutRef<'div'> {
  heading?: string;
  text?: string;
}

export const FormSuccess = (props: FormSuccessProps) => {
  const { className, heading, text, ...rest } = props;
  return (
    <div
      className={classNames(
        className,
        'bg-gray-concrete flex flex-col gap-8 p-8 text-center',
      )}
      {...rest}
    >
      <img
        className="mx-auto"
        // FIXME: Hardcoded alt text? What about Sweden
        alt="Innsending fullført"
        height="220"
        width="247"
        src="data:image/png;base64,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"
      />
      {heading && <h2 className="text-blue text-2xl">{heading}</h2>}
      {text && <p className="text-lg">{text}</p>}
    </div>
  );
};
