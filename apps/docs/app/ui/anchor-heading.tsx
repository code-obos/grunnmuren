type Props = {
  className?: string;
  children: React.ReactNode;
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function AnchorHeading(props: Props) {
  const Heading = `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return (
    <Heading className={props.className} id={props.id}>
      <a className="no-underline" href={`#${props.id}`} tabIndex={-1}>
        {props.children}
      </a>
    </Heading>
  );
}
