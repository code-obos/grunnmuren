import {
  UNSAFE_Link as Link,
  UNSAFE_Step as Step,
  UNSAFE_Stepper as Stepper,
} from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import type { ComponentType } from 'react';
import { useState } from 'react';

import { AddressStep } from './-lib/address-step';
import { BirthDateStep } from './-lib/birth-date-step';
import { DisplayStep } from './-lib/display-step';
import { EmailStep } from './-lib/email-step';
import { NameFieldsStep } from './-lib/name-fields-step';
import { PersonalIdStep } from './-lib/personal-id-step';
import { PhoneStep } from './-lib/phone-step';
import { SAMPLE_DATA } from './-lib/sample-data';
import type { StepProps } from './-lib/types';

export const Route = createFileRoute('/_docs/referanseskjema/')({
  component: RouteComponent,
});

const STEPS: { id: string; label: string; component: ComponentType<StepProps> }[] = [
  { id: 'name-fields', label: 'Navn', component: NameFieldsStep },
  { id: 'birth-date', label: 'Fødselsdato', component: BirthDateStep },
  { id: 'personal-id', label: 'Personnummer', component: PersonalIdStep },
  { id: 'phone', label: 'Telefon', component: PhoneStep },
  { id: 'email', label: 'E-post', component: EmailStep },
  { id: 'address', label: 'Adresse', component: AddressStep },
  { id: 'display', label: 'Visning', component: DisplayStep },
];

function RouteComponent() {
  const [activeStepId, setActiveStepId] = useState(STEPS[0].id);

  const activeIndex = STEPS.findIndex((s) => s.id === activeStepId);

  const goToStep = (stepIndex: number) => {
    const step = STEPS[stepIndex];
    if (step) {
      setActiveStepId(step.id);
      window.scrollTo({ top: 0 });
    }
  };

  const goToNext = () => goToStep(activeIndex + 1);
  const goToPrevious = () => goToStep(activeIndex - 1);

  const activeStep = STEPS[activeIndex];
  const ActiveStepComponent = activeStep?.component;

  return (
    <>
      <h1 className="heading-l mt-12 mb-10 lg:mb-12">Referanseskjema</h1>
      <p className="lead mb-12 max-w-prose">
        Denne siden dokumenterer alle typiske skjemakomponenter som brukes i våre skjemaer, med
        eksempler på props, validering og forskjeller mellom Norge og Sverige. Det er ikke ment som
        en komplett guide til alle mulige props og variasjoner, men heller en praktisk referanse for
        de vanligste felttypene.
      </p>

      <div className="relative mt-15 flex flex-col gap-4 lg:flex-row">
        <aside className="sticky top-0 z-10 h-fit shrink-0 bg-white py-4">
          <nav aria-label="Progressindikator">
            <Stepper activeStep={activeIndex} onStepChange={goToStep}>
              {STEPS.map((step, index) => (
                <Step key={step.id} state={index < activeIndex ? 'completed' : undefined}>
                  <Link>{step.label}</Link>
                </Step>
              ))}
            </Stepper>
          </nav>
        </aside>

        {ActiveStepComponent && (
          <ActiveStepComponent
            onNext={goToNext}
            onPrevious={goToPrevious}
            sampleData={SAMPLE_DATA}
          />
        )}
      </div>
    </>
  );
}
