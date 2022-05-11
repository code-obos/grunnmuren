export interface SnackbarContentProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode;
}

export const SnackbarContent = (props: SnackbarContentProps) => {
  return (
    <div
      className="gm-snackbar-content my-4 max-h-[50vh] max-w-prose overflow-y-auto"
      {...props}
    >
      {props.children}
    </div>
  );
};
