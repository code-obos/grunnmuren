import { ComponentPreview } from '@/ui/component-preview'
import { PropsTable } from '@/ui/props-table'
import { Edit, Search } from '@obosbbl/grunnmuren-icons-react'
import { Button } from '@obosbbl/grunnmuren-react'
import { createFileRoute } from '@tanstack/react-router'
import { ButtonDoc } from 'docgen'

export const Route = createFileRoute('/_docs/komponenter/buutton')({
  component: Page,
})

const examples = [
  { title: 'Knapp', code: '<Button>Knapp</Button>' },
  {
    title: 'Lenke-knapp',
    code: `<Button href="#link">Lenke-knapp</Button>`,
  },
  {
    title: 'Primærknapp',
    code: `
<>
  <Button variant="primary">Primærknapp</Button>
  <Button variant="primary" href="#primary-cta">
    Primærlink
  </Button>
</>
`,
  },
  {
    title: 'Sekundærknapp',
    code: `
<>
  <Button variant="secondary">Sekundærknapp</Button>
  <Button variant="secondary" href="#secondary-cta">
    Sekundærlink
  </Button>
</>
     `,
  },
  {
    title: 'Tertiærknapp',
    code: `
<>
  <Button variant="tertiary">Tertiærknapp</Button>
  <Button variant="tertiary" href="#tertiary-cta">
    Tertiærlink
  </Button>
</>
   `,
  },
  {
    title: 'Knapp med ikon og tekst',
    code: `
<>
  <Button>
    <Edit />
    Rediger
  </Button>
  <Button href="#search">
    <Search />
    Søk
  </Button>
</>
      `,
  },
  {
    title: 'Knapp med kun ikon',
    code: `
<Button isIconOnly aria-label="Søk">
  <Search />
</Button>
 `,
  },
  {
    title: 'Knapp med pending-tilstand',
    code: `
<>
  <Button isPending variant="primary">
    Primærknapp
  </Button>
  <Button isPending variant="secondary">
    Sekundærknapp
  </Button>
  <Button isPending variant="tertiary">
    Tertiærknapp
  </Button>
</>
      `,
  },
  {
    title: 'Transparent bakgrunn',
    code: `
<>
  <Button variant="primary">Primærknapp</Button>
  <Button variant="secondary">Sekundærknapp</Button>
  <Button variant="tertiary">Tertiærknapp</Button>
</>
`,
  },
  {
    title: 'Lys bakgrunn',
    code: `
<div className="flex gap-x-[inherit] bg-mint-lightest p-8">
  <Button variant="primary">Primærknapp</Button>
  <Button variant="secondary">Sekundærknapp</Button>
  <Button variant="tertiary">Tertiærknapp</Button>
</div>
  `,
  },
  {
    title: 'Grønn bakgrunn',
    code: `
<div className="flex gap-x-[inherit] bg-green-dark p-8">
  <Button variant="primary" color="mint">
    Primærknapp
  </Button>
  <Button variant="secondary" color="mint">
    Sekundærknapp
  </Button>
  <Button variant="tertiary" color="mint">
    Tertiærknapp
  </Button>
</div>
`,
  },
  {
    title: 'Blå bakgrunn',
    code: `
<div className="flex gap-x-[inherit] bg-blue-dark p-8">
  <Button variant="primary" color="mint">
    Primærknapp
  </Button>
  <Button variant="secondary" color="mint">
    Sekundærknapp
  </Button>
  <Button variant="tertiary" color="mint">
    Tertiærknapp
  </Button>
</div>
      `,
  },
]

function Page() {
  return (
    <>
      <h1 className="heading-l mb-12 mt-9">{ButtonDoc.displayName}</h1>
      <div className="prose">
        <p>{ButtonDoc.description}</p>
      </div>

      {examples.map(({ title, code }) => (
        <ComponentPreview
          scope={{ Button, Edit, Search }}
          key={title}
          title={title}
          code={code}
        />
      ))}
      <PropsTable props={ButtonDoc.props} />
    </>
  )
}
