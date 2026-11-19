import { Error as ErrorIcon } from '@obosbbl/grunnmuren-icons-react';
import {
  Tag,
  TagGroup,
  TagList,
  UNSAFE_Table as Table,
  UNSAFE_TableBody as TableBody,
  UNSAFE_TableCell as TableCell,
  UNSAFE_TableColumn as TableColumn,
  UNSAFE_TableHeader as TableHeader,
  UNSAFE_TableRow as TableRow,
} from '@obosbbl/grunnmuren-react';
import { cx } from 'cva';
import { Fragment, useState } from 'react';

import {
  type ContrastFailure,
  GROUPS,
  ROLE_LABELS,
  ROLES,
  type Role,
  type ThemeBuilder,
} from './theme-state';

// Floored, so a ratio that fails never shows as one that passes
const formatRatio = (ratio: number) =>
  `${(Math.floor(ratio * 100) / 100).toFixed(2).replace('.', ',')}:1`;

const describeFailures = (failures: Array<ContrastFailure>) =>
  failures.map(
    ({ background, ratio, minimum }) =>
      `på ${background}: ${formatRatio(ratio)} (krav ${String(minimum).replace('.', ',')}:1)`,
  );

export const ColorMatrix = ({ builder }: { builder: ThemeBuilder }) => {
  const [shown, setShown] = useState<Set<Role>>(new Set(ROLES));
  const [copied, setCopied] = useState('');
  const roles = ROLES.filter((role) => shown.has(role));
  const hasFailures = [...builder.contrastFailures.keys()].some((path) =>
    shown.has(path.split('.')[0] as Role),
  );

  const copy = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(`${color} er kopiert`);
    } catch {
      setCopied(`Fikk ikke kopiert ${color}`);
    }
  };

  return (
    <div className="grid gap-6">
      <TagGroup
        aria-label="Vis roller"
        selectionMode="multiple"
        disallowEmptySelection
        selectedKeys={shown}
        onSelectionChange={(keys) => setShown(new Set(keys as Set<Role>))}
      >
        <TagList>
          {ROLES.map((role) => (
            <Tag key={role} id={role}>
              {ROLE_LABELS[role]}
            </Tag>
          ))}
        </TagList>
      </TagGroup>

      <div className="flex flex-wrap items-center justify-between gap-4">
        {hasFailures ? (
          <span className="bg-danger-base-default text-danger-base-contrast-subtle description inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5">
            <ErrorIcon className="size-4 flex-none" />
            Stryker kontrast i minst et par
          </span>
        ) : (
          <span />
        )}
        <p className="description">Trykk på en farge for å kopiere hex-verdien</p>
      </div>

      <Table aria-label="Fargesystem" className="w-full">
        <TableHeader>
          <TableColumn isRowHeader className="w-32">
            Variant
          </TableColumn>
          {roles.map((role) => (
            <TableColumn key={role}>{ROLE_LABELS[role]}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {GROUPS.map(({ group, variants }) => (
            <Fragment key={group}>
              <TableRow className="bg-accent-background-tinted">
                <TableCell className="border-neutral-border-subtle border-r capitalize">
                  {group}
                </TableCell>
                <TableCell colSpan={roles.length}>
                  <span className="sr-only">{group}</span>
                </TableCell>
              </TableRow>
              {variants.map((variant) => (
                <TableRow key={variant}>
                  <TableCell className="border-neutral-border-subtle border-r">
                    {variant.slice(group.length + 1).replace('contrast-', 'contrast ')}
                  </TableCell>
                  {roles.map((role) => {
                    const color = builder.final[role][variant];
                    const failures = builder.contrastFailures.get(`${role}.${variant}`);
                    return (
                      <TableCell key={role}>
                        <button
                          type="button"
                          onClick={() => copy(color)}
                          title={[
                            `--gm-color-${role}-${variant}`,
                            ...describeFailures(failures ?? []),
                          ].join('\n')}
                          aria-label={`${ROLE_LABELS[role]} ${variant}: ${color}${failures ? '. Stryker kontrastkravet' : ''}. Kopier`}
                          className={cx(
                            'focus-visible:outline-focus -my-1 inline-flex cursor-pointer items-center gap-3 rounded-md border-[1.5px] px-1.5 py-0.5 hover:bg-black/5',
                            failures ? 'border-danger-base-default' : 'border-transparent',
                          )}
                        >
                          <span
                            className="size-5 flex-none rounded-sm border border-black/15"
                            style={{ background: color }}
                          />
                          <span className="description">{color}</span>
                        </button>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <p className="sr-only" role="status">
        {copied}
      </p>
    </div>
  );
};
