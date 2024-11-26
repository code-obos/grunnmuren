import * as icons from '@obosbbl/grunnmuren-icons-react';
import { Card, Content } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ikoner')({
  component: IconsGrid,
});

function IconsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_150px)] content-center justify-center gap-6">
      {Object.entries(icons).map(([iconName, Icon]) => (
        <IconCard key={iconName} iconName={iconName} Icon={Icon} />
      ))}
    </div>
  );
}

function IconCard({ iconName, Icon }) {
  return (
    <Card className="bg-gray-lightest" key={iconName}>
      <Content>
        <Icon className="mx-auto" />
        <span className="block text-center text-sm">{iconName}</span>
      </Content>
    </Card>
  );
}
