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
} from '@obosbbl/grunnmuren-react';
import { ReactNode } from 'react';

import type { ComponentProp } from './types';

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
      {children}
      {props && (
        <Disclosure>
          <DisclosureButton className="font-medium" withChevron>
            Props
          </DisclosureButton>
          <DisclosurePanel>
            <Table aria-describedby={name} aria-labelledby="fdfdfd">
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
    <section className="bg-sky-light prose border-sky rounded-md border px-4 py-3">
      <h3 className="heading-s mb-2">Norge vs Sverige</h3>
      <div>{children}</div>
    </section>
  );
}

type ExampleBlockProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
};

export function ExampleBlock({ label, description, children }: ExampleBlockProps) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h4 className="heading-xs">{label}</h4>
        {description ? <p className="text-gray-dark">{description}</p> : null}
      </div>
      <div className="border-gray-light rounded-md border p-4">
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
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
