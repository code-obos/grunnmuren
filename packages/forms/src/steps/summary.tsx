'use client';
import { Edit } from '@obosbbl/grunnmuren-icons-react';
import { Button, Card } from '@obosbbl/grunnmuren-react';
import type { ReactNode } from 'react';

import { stepTranslations } from '../translations';
import { useFormsLocale } from '../use-forms-locale';

export type SummaryCardProps = {
  /** Rendered as an `h3` above the card. */
  title?: string;
  /** Adds a localized "Endre" button, typically `() => steps.goTo('contact')`. */
  onEdit?: () => void;
  /** Replaces the default edit button, for example a link to another page. */
  editAction?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function SummaryCard({ title, onEdit, editAction, className, children }: SummaryCardProps) {
  const texts = stepTranslations[useFormsLocale()];
  const action =
    editAction ??
    (onEdit && (
      <Button type="button" variant="tertiary" onPress={onEdit} className="self-start">
        {texts.edit}
        <Edit />
      </Button>
    ));

  return (
    <div className="flex flex-col gap-4">
      {title && <h3 className="heading-s">{title}</h3>}
      <Card variant="outlined" className={['[&>div]:p-6', className ?? 'max-w-md'].join(' ')}>
        <div className="flex flex-col gap-1">{children}</div>
        {action && (
          <>
            <hr className="border-gray my-0" />
            {action}
          </>
        )}
      </Card>
    </div>
  );
}

export type SummaryItemProps = {
  label: string;
  value: ReactNode;
};

export function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <p>
      <span className="block font-semibold sm:inline">{label}</span> {value}
    </p>
  );
}
