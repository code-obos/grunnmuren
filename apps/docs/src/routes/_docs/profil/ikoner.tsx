import * as icons from '@obosbbl/grunnmuren-icons-react';
import { Download } from '@obosbbl/grunnmuren-icons-react';
import { Button, Card } from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { ResourceLink, ResourceLinks } from '@/ui/resource-links';
import { ScrollToTop } from '@/ui/scroll-to-top';

export const Route = createFileRoute('/_docs/profil/ikoner')({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Ikoner | Grunnmuren' },
      { name: 'description', content: 'Grunnmuren sitt ikonsett' },
    ],
  }),
});

function Page() {
  return (
    <>
      <h1 className="heading-l my-12">Ikoner</h1>
      <div className="prose">
        <p>
          Grunnmuren sitt ikonsett består av {Object.keys(icons).length}{' '}
          forskjellige ikoner. Settet er publisert som npm pakker både i{' '}
          <a href="https://www.npmjs.com/package/@obosbbl/grunnmuren-icons-svg">
            svg-format
          </a>{' '}
          og som{' '}
          <a href="https://www.npmjs.com/package/@obosbbl/grunnmuren-icons-react">
            React-komponenter
          </a>
          . Du kan også laste ned individuelle ikoner på denne siden.
        </p>

        <p>
          Hvis det er et ikon du savner kan du ta kontakt med oss på{' '}
          <a href="https://obos.slack.com/archives/C03FR05FJ9F">
            Slack (#grunnmuren-design-system)
          </a>
          , så kan vi se hva vi kan gjøre.
        </p>
      </div>

      <ResourceLinks className="my-12">
        <ResourceLink
          type="figma"
          href="https://www.figma.com/design/9OvSg0ZXI5E1eQYi7AWiWn/Grunnmuren-2.0-%E2%94%82-Designsystem?node-id=30-2099&t=O9zg6ynNvNWFeOy8-4"
        />

        <ResourceLink
          type="github"
          href="https://github.com/code-obos/grunnmuren/tree/main/packages/icons-svg"
        />

        <ResourceLink
          type="npm"
          href="https://www.npmjs.com/package/@obosbbl/grunnmuren-icons-react"
        />
      </ResourceLinks>
      <IconsGrid />
      <ScrollToTop />
    </>
  );
}

function IconsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,130px)] content-center gap-6">
      {Object.entries(icons).map(([iconName, Icon]) => (
        <IconCard key={iconName} iconName={iconName} Icon={Icon} />
      ))}
    </div>
  );
}

function IconCard({ iconName, Icon }) {
  const downloadSvgLink = `/resources/icons/${iconName}.svg`;

  return (
    <Card className="bg-gray-lightest" key={iconName}>
      <Icon className="mx-auto" />
      <span className="block text-center text-sm">{iconName}</span>
      <Button
        variant="tertiary"
        href={downloadSvgLink}
        download
        className="ml-auto w-[44px]"
      >
        <Download className="flex-none" />
      </Button>
    </Card>
  );
}
