import { createFileRoute } from '@tanstack/react-router';
import { BadgeDoc } from '../../../docgen';
import { PropsTable } from '@/ui/props-table';

export const Route = createFileRoute('/komponenter/badge')({
  component: Page,
});

function Page() {
  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{BadgeDoc.displayName}</h1>
      <div className="prose">
        <p>{BadgeDoc.description}</p>
      </div>
      <PropsTable props={BadgeDoc.props} />
    </>
  );
}
