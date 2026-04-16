import {
  UNSAFE_Link as Link,
  UNSAFE_Step as Step,
  UNSAFE_Stepper as Stepper,
} from '@obosbbl/grunnmuren-react';
import { createFileRoute } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

import { AddressStep } from './-lib/address-step';
import { BirthDateStep } from './-lib/birth-date-step';
import { DisplayStep } from './-lib/display-step';
import { EmailStep } from './-lib/email-step';
import { NameFieldsStep } from './-lib/name-fields-step';
import { PersonalIdStep } from './-lib/personal-id-step';
import { PhoneStep } from './-lib/phone-step';
import { SAMPLE_DATA } from './-lib/sample-data';

export const Route = createFileRoute('/_docs/referanseskjema/')({
  component: RouteComponent,
});

const STEPS = [
  {
    id: 'name-fields',
    label: 'Navn',
  },
  {
    id: 'birth-date',
    label: 'Fødselsdato',
  },
  {
    id: 'personal-id',
    label: 'Personnummer',
  },
  {
    id: 'phone',
    label: 'Telefon',
  },
  {
    id: 'email',
    label: 'E-post',
  },
  {
    id: 'address',
    label: 'Adresse',
  },
  {
    id: 'display',
    label: 'Visning',
  },
];

function RouteComponent() {
  const [activeStepId, setActiveStepId] = useState(STEPS[0].id);

  const activeIndex = STEPS.findIndex((s) => s.id === activeStepId);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const goToNext = useCallback(() => {
    const nextStep = STEPS[activeIndex + 1];
    if (nextStep) {
      setActiveStepId(nextStep.id);
      scrollToTop();
    }
  }, [activeIndex, scrollToTop]);

  const goToPrevious = useCallback(() => {
    const prevStep = STEPS[activeIndex - 1];
    if (prevStep) {
      setActiveStepId(prevStep.id);
      scrollToTop();
    }
  }, [activeIndex, scrollToTop]);

  const goToStep = useCallback(
    (stepId: string) => {
      setActiveStepId(stepId);
      scrollToTop();
    },
    [scrollToTop],
  );
  const currentStepIndex = STEPS.findIndex((s) => s.id === activeStepId);

  const handleStepChange = (stepIndex: number) => {
    const targetStep = STEPS[stepIndex];
    if (targetStep) {
      goToStep(targetStep.id);
    }
  };

  const stepProps = {
    onNext: goToNext,
    onPrevious: goToPrevious,
    sampleData: SAMPLE_DATA,
  };

  return (
    <article className="pb-21.5">
      <header className="mb-9">
        <div className="flex max-w-prose flex-col gap-4">
          <h1 className="heading-l">Referanseskjema</h1>
          <p>
            Dette skjemaet dokumenterer alle delte skjemakomponenter som brukes på tvers av alle
            skjemaer. Hver komponent viser props, eksempler, forskjeller mellom Norge og Sverige, og
            hvilke skjemaer som bruker den.
          </p>
        </div>
      </header>

      <hr className="border-gray-light" />

      <div className="relative mt-15">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <aside className="sticky top-0 z-10 shrink-0 bg-white p-4">
            <nav className="top-4 lg:top-8" aria-label="Progressindikator">
              <Stepper activeStep={currentStepIndex} onStepChange={handleStepChange}>
                {STEPS.map((step, index) => {
                  const isCompleted = step.id !== activeStepId;
                  const isDisabled = index > currentStepIndex && !isCompleted;

                  return (
                    <Step
                      key={step.id}
                      state={isCompleted ? 'completed' : undefined}
                      isDisabled={isDisabled}
                    >
                      <Link>{step.label}</Link>
                    </Step>
                  );
                })}
              </Stepper>
            </nav>
          </aside>

          <div className="max-w-prose">
            {activeStepId === 'name-fields' && <NameFieldsStep {...stepProps} />}
            {activeStepId === 'birth-date' && <BirthDateStep {...stepProps} />}
            {activeStepId === 'personal-id' && <PersonalIdStep {...stepProps} />}
            {activeStepId === 'phone' && <PhoneStep {...stepProps} />}
            {activeStepId === 'email' && <EmailStep {...stepProps} />}
            {activeStepId === 'address' && <AddressStep {...stepProps} />}
            {activeStepId === 'display' && <DisplayStep {...stepProps} />}
          </div>
        </div>
      </div>
    </article>
  );
}
