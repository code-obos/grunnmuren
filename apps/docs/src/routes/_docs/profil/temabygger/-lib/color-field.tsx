import { TextField } from '@obosbbl/grunnmuren-react';
import { type ReactNode, useState } from 'react';

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
 */
export const ColorField = ({ label, value, onChange, description }: ColorFieldProps) => {
  const [draft, setDraft] = useState<string>();
  const isInvalid = draft != null && draft.trim().length >= 6 && !toHex(draft);

  return (
    <div className="grid gap-1">
      <div className="flex items-end gap-2">
        <TextField
          label={label}
          value={draft ?? value}
          spellCheck="false"
          autoComplete="off"
          className="w-36 flex-none"
          isInvalid={isInvalid}
          onChange={(text) => {
            setDraft(text);
            const hex = toHex(text);
            if (hex) {
              onChange(hex);
            }
          }}
          onBlur={() => setDraft(undefined)}
        />
        <span className="border-neutral-border-subtle flex h-11 w-26 flex-none rounded-md border bg-white p-1">
          <input
            type="color"
            value={value}
            aria-label={`Fargevelger for ${label}`}
            className="focus-visible:outline-focus size-full cursor-pointer rounded-sm border-0 bg-transparent p-0 [&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
            onChange={(event) => {
              setDraft(undefined);
              onChange(event.target.value.toUpperCase());
            }}
          />
        </span>
      </div>
      {isInvalid && (
        <p className="footnote text-danger-text-default">Skriv fargen som hex, feks #2D3A26</p>
      )}
      {description && <p className="footnote px-3">{description}</p>}
    </div>
  );
};
