import {
  Button,
  UNSAFE_Table as Table,
  UNSAFE_TableHeader as TableHead,
  UNSAFE_TableRow as TableRow,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableColumn as TableColumn,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Card,
  Heading,
  Content,
  Alertbox,
} from '@obosbbl/grunnmuren-react';
import { ReactNode } from 'react';

import type { ComponentProp } from './types';

const VALIDATION_SOURCE_URL =
  'https://github.com/code-obos/public-frontend-modules/tree/main/packages/validation';

type ComponentInfoProps = {
  name: string;
  description: string;
  props?: ComponentProp[];
  children?: ReactNode;
};

export function ComponentInfo({ name, description, props, children }: ComponentInfoProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="heading-m">{name}</h2>
      <p>{description}</p>
      <div className="w-fit">{children}</div>
      {props && (
        <Disclosure>
          <DisclosureButton className="font-medium" withChevron>
            Props
          </DisclosureButton>
          <DisclosurePanel>
            <Table aria-label={`Props for ${name}`}>
              <TableHead>
                <TableColumn isRowHeader>Navn</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Default</TableColumn>
                <TableColumn>Beskrivelse</TableColumn>
              </TableHead>
              <TableBody>
                {props.map((prop) => (
                  <TableRow key={prop.name} className="border-gray-light border-b">
                    <TableCell className="font-medium">{prop.name}</TableCell>
                    <TableCell>{prop.type}</TableCell>
                    <TableCell>{prop.default ?? '-'}</TableCell>
                    <TableCell>{prop.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DisclosurePanel>
        </Disclosure>
      )}
    </section>
  );
}

export function CountryDiffBox({ children }: { children: React.ReactNode }) {
  return (
    <Alertbox variant="info" role="status">
      <Heading level={3} className="not-prose">
        Norge vs Sverige
      </Heading>
      <Content>{children}</Content>
    </Alertbox>
  );
}

type ExampleBlockProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export function ExampleBlock({ label, description, children }: ExampleBlockProps) {
  return (
    <Card>
      <Content>
        <Heading level={4}>{label}</Heading>
        {description && <p className="text-gray-dark">{description}</p>}
        <div className="border-gray-light rounded-md border p-4">
          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </Content>
    </Card>
  );
}

type StepNavigationProps = {
  onNext?: () => void;
  onPrevious?: () => void;
};

export function StepNavigation({ onNext, onPrevious }: StepNavigationProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {onPrevious ? (
        <Button variant="secondary" onPress={onPrevious}>
          Forrige steg
        </Button>
      ) : null}
      {onNext && <Button onPress={onNext}>Neste steg</Button>}
    </div>
  );
}

type ValidationSourceLinkProps = {
  children?: ReactNode;
};

export function ValidationSourceLink({
  children = '@obosbbl/validation',
}: ValidationSourceLinkProps) {
  return (
    <a href={VALIDATION_SOURCE_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
