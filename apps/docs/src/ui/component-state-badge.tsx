import { Badge, type BadgeProps } from '@obosbbl/grunnmuren-react';

type Props = {
  componentState?: 'new' | 'deprecated' | 'beta' | 'stable' | null;
  className?: string;
};

export function ComponentStateBadge({ componentState, ...props }: Props) {
  if (!componentState || componentState === 'stable') {
    return null;
  }

  let color: BadgeProps['color'];
  let text: string | undefined;

  switch (componentState) {
    case 'new':
      color = 'mint';
      text = 'Ny';
      break;
    case 'beta':
      color = 'blue-dark';
      text = 'Beta';
      break;
    case 'deprecated':
      color = 'gray-dark';
      text = 'Deprekert';
      break;
  }

  return (
    <Badge {...props} size="small" color={color}>
      {text}
    </Badge>
  );
}
