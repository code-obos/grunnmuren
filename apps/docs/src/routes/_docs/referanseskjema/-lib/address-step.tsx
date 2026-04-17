import { Checkbox, Combobox, ComboboxItem, TextField } from '@obosbbl/grunnmuren-react';
import { useState } from 'react';

import { Code } from '@/ui/code';

import { ComponentInfo, CountryDiffBox, ExampleBlock, StepNavigation } from './shared';
import type { StepProps } from './types';

const PROPS = [
  {
    name: 'addressFieldName',
    type: 'string',
    description: 'Feltnavn for adresse-combobox',
  },
  {
    name: 'hiddenFieldsNamePrefix',
    type: 'string',
    description: 'Prefiks for skjulte adressefelter i skjemadata',
  },
  {
    name: 'label',
    type: 'ReactNode',
    default: '"Adresse" (NO) / "Adress" (SE)',
    description: 'Label for adressefelt',
  },
  {
    name: 'hideCareOf',
    type: 'boolean',
    default: 'false',
    description: 'Skjuler c/o-felt og avkrysning',
  },
  {
    name: 'defaultAddress',
    type: 'Address',
    description: 'Forhandsutfylt adresseverdi',
  },
];

const SUGGESTIONS = ['Hammersborg torg 1, 0179 Oslo', 'Storgata 10, 0155 Oslo'];

export function AddressStep({ onNext, onPrevious, sampleData }: StepProps) {
  const [useCareOfAddress, setUseCareOfAddress] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <ComponentInfo
        name="Adressefelt"
        description="Adressefelt med autofullforing og valgfri c/o-adresse. Valgt adresse lagres i skjulte felt med prefiks fra hiddenFieldsNamePrefix."
        props={PROPS}
      >
        <Code
          code={`import { TextField } from '@obosbbl/grunnmuren-react';

<div>
  <Combobox label="Adresse" defaultInputValue="Hammersborg torg 1, 0179 Oslo">
    {SUGGESTIONS.map((suggestion) => (
      <ComboboxItem key={suggestion}>{suggestion}</ComboboxItem>
    ))}
  </Combobox>

  <div>
    <p className="font-semibold">
      <Trans>Adressen du har valgt</Trans>
    </p>
    <div className="flex flex-col rounded-lg bg-gray-lightest p-4">
      <span>
        {selectedAddress.streetAddress} {selectedAddress.houseNumber}
        {selectedAddress.entranceNumber}
      </span>
      <span>
        {selectedAddress.postalCode} {selectedAddress.postalDistrict}
      </span>
    </div>
  </div>

  <Checkbox>Bruk c/o adresse</Checkbox>
  <TextField label="c/o (navn pa person)" defaultValue={sampleData.careOfName} />
</div>`}
        />
      </ComponentInfo>

      <CountryDiffBox>
        <ul className="flex list-disc flex-col gap-1 pl-4">
          <li>
            <strong>Label:</strong> "Adresse" (NO) / "Adress" (SE)
          </li>
          <li className="wrap-break-word">
            <strong>Autofullforing:</strong> Bruker obos.no/api/nettsted/suggest/address med
            country_code param for NO/SE
          </li>
          <li>
            <strong>c/o:</strong> "Bruk c/o adresse" (NO) / "Anvand c/o-adress" (SE)
          </li>
          <li>
            <strong>Validering:</strong> Identisk adresse-struktur for begge land
          </li>
        </ul>
      </CountryDiffBox>

      <div className="prose">
        <h3 className="heading-s">Skjulte felt</h3>
        <p>
          Komponenten lagrer valgt adresse i skjulte input-felt med prefiks fra
          hiddenFieldsNamePrefix:
        </p>
        <ul className="text-gray-dark flex list-disc flex-col gap-1 pl-4">
          <li>{'{prefix}streetAddress'}</li>
          <li>{'{prefix}houseNumber'}</li>
          <li>{'{prefix}entranceNumber'}</li>
          <li>{'{prefix}postalCode'}</li>
          <li>{'{prefix}postalDistrict'}</li>
          <li>{'{prefix}CoName'} - kun når c/o er aktivert</li>
        </ul>
      </div>

      <div className="prose">
        <h3 className="heading-s">Validering</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-1 pl-4">
          <li>
            Objekt med streetAddress (påkrevd), houseNumber, entranceNumber, postalCode,
            postalDistrict
          </li>
          <li>careOfAddress - maks 150 tegn. Brukes som optional når c/o er aktivert.</li>
        </ul>
      </div>

      <div className="prose">
        <h3 className="heading-s">Når bør du overstyre props?</h3>
        <ul className="text-gray-dark flex list-disc flex-col gap-2 pl-4">
          <li>
            <strong>label:</strong> Overstyr når adressen gjelder en annen person (f.eks. "Mottakers
            adresse").
          </li>
          <li>
            <strong>hideCareOf:</strong> Sett til true når c/o-adresse ikke er relevant for
            konteksten.
          </li>
          <li>
            <strong>hiddenFieldsNamePrefix:</strong> Bruk ulike prefikser når skjemaet har flere
            adressefelt.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="heading-s">Eksempler</h3>

        <ExampleBlock label="Standard" description="Grunnleggende bruk med autofullforing og c/o">
          <Combobox label="Adresse" defaultInputValue="Hammersborg torg 1, 0179 Oslo">
            {SUGGESTIONS.map((suggestion) => (
              <ComboboxItem key={suggestion}>{suggestion}</ComboboxItem>
            ))}
          </Combobox>
          <div>
            <p className="font-semibold">Adressen du har valgt</p>
            <div className="bg-gray-lightest flex flex-col rounded-lg p-4">
              <span>
                {sampleData.address.streetAddress} {sampleData.address.houseNumber}
                {sampleData.address.entranceNumber}
              </span>
              <span>
                {sampleData.address.postalCode} {sampleData.address.postalDistrict}
              </span>
            </div>
          </div>
          <Checkbox defaultSelected>Bruk c/o adresse</Checkbox>
          <TextField label="c/o (navn pa person)" defaultValue={sampleData.careOfName} />
        </ExampleBlock>

        <ExampleBlock label="Uten c/o" description="c/o-avkrysning er skjult">
          <Combobox label="Adresse" placeholder="Søk etter adresse">
            {SUGGESTIONS.map((suggestion) => (
              <ComboboxItem key={suggestion}>{suggestion}</ComboboxItem>
            ))}
          </Combobox>
        </ExampleBlock>

        <ExampleBlock
          label="Egendefinert label"
          description="Brukes når adressen gjelder en annen person"
        >
          <Combobox label="Mottakers adresse" placeholder="Sok etter mottakers adresse">
            {SUGGESTIONS.map((suggestion) => (
              <ComboboxItem key={suggestion}>{suggestion}</ComboboxItem>
            ))}
          </Combobox>
          <Checkbox isSelected={useCareOfAddress} onChange={setUseCareOfAddress}>
            Bruk c/o adresse
          </Checkbox>
          {useCareOfAddress && (
            <TextField label="c/o (navn pa person)" defaultValue={sampleData.careOfName} />
          )}
        </ExampleBlock>

        <ExampleBlock
          label="Med forhandsutfylt adresse"
          description="Brukes når adressen hentes fra BIS/innlogging"
        >
          <Combobox label="Adresse" defaultInputValue="Hammersborg torg 1, 0179 Oslo">
            {SUGGESTIONS.map((suggestion) => (
              <ComboboxItem key={suggestion}>{suggestion}</ComboboxItem>
            ))}
          </Combobox>
          <div>
            <p className="font-semibold">Adressen du har valgt</p>
            <div className="bg-gray-lightest flex flex-col rounded-lg p-4">
              <span>
                {sampleData.address.streetAddress} {sampleData.address.houseNumber}
                {sampleData.address.entranceNumber}
              </span>
              <span>
                {sampleData.address.postalCode} {sampleData.address.postalDistrict}
              </span>
            </div>
          </div>
          <Checkbox isSelected={useCareOfAddress} onChange={setUseCareOfAddress}>
            Bruk c/o adresse
          </Checkbox>
          {useCareOfAddress && (
            <TextField label="c/o (navn pa person)" defaultValue={sampleData.careOfName} />
          )}
        </ExampleBlock>
      </div>

      <StepNavigation onNext={onNext} onPrevious={onPrevious} />
    </div>
  );
}
