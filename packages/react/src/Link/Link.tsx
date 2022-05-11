export interface LinkProps {
  children: React.ReactNode;

  icon?: React.ReactNode;

  href: string;

  className?: string;
}

export const Link = (props: LinkProps) => {
  let iconClass = '';

  if (props.icon) {
    iconClass = 'inline-flex items-center gap-2';
  }

  return (
    <a className={iconClass} href={props.href}>
      {props.icon}
      {props.children}
    </a>
  );
};
