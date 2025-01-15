type Props = {
  className?: string;
  children: React.ReactNode;
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function AnchorHeading(props: Props) {
  const Heading = `h${props.level}` as keyof JSX.IntrinsicElements;
  return (
    <Heading className={props.className} id={props.id}>
      <a className="no-underline" href={`#${props.id}`} tabIndex={-1}>
        {props.children}
      </a>
    </Heading>
  );
}
