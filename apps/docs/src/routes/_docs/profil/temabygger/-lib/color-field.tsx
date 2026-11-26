import { TextField } from '@obosbbl/grunnmuren-react';
import { type ReactNode, startTransition, useState } from 'react';

import { toHex } from './theme-state';

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: ReactNode;
};

/**
 * A hex field with a colour picker next to it. The colour only changes once the text is a
 * whole hex, and the field goes back to the colour when you leave it half written.
 *
 * The field shows what you type or drag right away, while the theme follows in a transition.
 * Dragging in the picker fires on every move, and rebuilding the whole theme each time made it lag.
 */
export const ColorField = ({ label, value, onChange, description }: ColorFieldProps) => {
  const [draft, setDraft] = useState<string>();
  const isInvalid = draft != null && draft.trim().length >= 6 && !toHex(draft);
  const color = (draft != null && toHex(draft)) || value;

  const update = (hex: string) => startTransition(() => onChange(hex));

  return (
    <div className="grid grid-cols-1 gap-1">
      <div className="flex items-end gap-2">
        <TextField
          label={label}
          value={draft ?? value}
          spellCheck="false"
          autoComplete="off"
          className="min-w-0 flex-1"
          isInvalid={isInvalid}
          onChange={(text) => {
            setDraft(text);
            const hex = toHex(text);
            if (hex) {
              update(hex);
            }
          }}
          onBlur={() => setDraft(undefined)}
        />
        <span className="border-neutral-border-subtle flex h-11 w-26 flex-none rounded-md border bg-white p-1">
          <input
            type="color"
            value={color}
            aria-label={`Fargevelger for ${label}`}
            className="focus-visible:outline-focus size-full cursor-pointer rounded-sm border-0 bg-transparent p-0 [&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
            onChange={(event) => {
              const hex = event.target.value.toUpperCase();
              setDraft(hex);
              update(hex);
            }}
            onBlur={() => setDraft(undefined)}
          />
        </span>
      </div>
      {isInvalid && (
        <p className="description text-danger-text-default">Skriv fargen som hex, feks #2D3A26</p>
      )}
      {description && <p className="description px-3">{description}</p>}
    </div>
  );
};
