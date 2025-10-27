import { Box, Figma, Github, Link } from '@obosbbl/grunnmuren-icons-react';
import { cx } from 'cva';

type ResourceLinksProps = {
  className?: string;
  children: React.ReactNode;
};

export function ResourceLinks(props: ResourceLinksProps) {
  return (
    <div className={cx(props.className, 'flex gap-4')}>{props.children}</div>
  );
}

type ResourceLinkProps = {
  type: 'github' | 'figma' | 'npm' | 'other';
  href: string;
  text?: string;
};

export function ResourceLink(props: ResourceLinkProps) {
  let Icon: typeof Figma;
  let { text } = props;

  switch (props.type) {
    case 'figma':
      Icon = Figma;
      text = 'Figma';
      break;
    case 'github':
      Icon = Github;
      text = 'GitHub';
      break;
    case 'npm':
      Icon = Box;
      text = 'npm';
      break;
    case 'other':
      Icon = Link;
      break;
  }

  return (
    <a className="flex gap-2" href={props.href}>
      <Icon className="shrink-0" /> {text}
    </a>
  );
}
