import { CheckCircle } from '@obosbbl/grunnmuren-icons';
import { ReactNode, useMemo } from 'react';
import { FormStatus } from './FormStep';
import classNames from 'clsx';

export interface FormStepHeaderProps {
  className?: string;
  collapsed: boolean;
  step: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
  formStatus: FormStatus;
}

export const FormStepHeader = (props: FormStepHeaderProps) => {
  const { className, collapsed, step, onClick, children, formStatus } = props;

  return (
    <button
      type="button"
      aria-label={collapsed ? `Åpne steg ${step}` : `Steg ${step} er åpent`}
      onClick={onClick}
      disabled={collapsed && formStatus !== 'completed'}
      className={classNames(className, 'w-full py-4 pl-4 md:py-8 ', {
        'bg-blue-dark cursor-default': !collapsed,
        'border-black bg-white': collapsed && formStatus !== 'completed',

        'border-green bg-green text-white':
          collapsed && formStatus === 'completed',
      })}
    >
      <FormStepHeaderContent
        collapsed={collapsed}
        step={step}
        formStatus={formStatus}
      >
        {children}
      </FormStepHeaderContent>
    </button>
  );
};

export interface FormStepHeaderContentProps {
  collapsed: boolean;
  step: number;
  children: ReactNode;
  formStatus: FormStatus;
}

export const FormStepHeaderContent = (props: FormStepHeaderContentProps) => {
  const { collapsed, step, children, formStatus } = props;

  const statusText = useMemo(() => {
    switch (formStatus) {
      case 'blank':
        return 'Ikke utfylt';
      case 'completed':
        return 'Fullført';
    }
  }, [formStatus]);

  const statusIcon = useMemo(() => {
    if (!collapsed) {
      return <div>{step}</div>;
    }

    switch (formStatus) {
      case 'blank':
        return <div>{step}</div>;
      case 'completed':
        return <CheckCircle className="h-10 w-10 md:h-12 md:w-12" />;
    }
  }, [formStatus, step, collapsed]);

  return (
    <h2
      className={classNames(
        'grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] items-center text-left text-xl font-bold md:text-2xl',
        {
          'text-white': !collapsed,
        },
      )}
    >
      <div
        className={classNames(
          'row-span-2 mr-4 flex h-10 w-10 items-center justify-center self-center rounded-full border-2 font-bold md:h-12 md:w-12',
          {
            'border-white text-white': !collapsed,
            'border-black': collapsed && formStatus !== 'completed',
            'border-none': formStatus === 'completed' && collapsed,
          },
        )}
        role="text"
      >
        {statusIcon}
      </div>
      {children}
      {collapsed && (
        <div
          className={classNames(
            'text-base font-normal',
            formStatus === 'completed' ? 'text-white' : 'text-black',
          )}
        >
          {statusText}
        </div>
      )}
    </h2>
  );
};
