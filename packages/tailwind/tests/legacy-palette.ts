/**
 * Where each colour in today's palette lives in the ported primitives. The new set
 * collapses the aliases (`blue-light` is `sky`), so several legacy names share one.
 *
 * This is what backs the claim that the token layer is additive: every value a consumer
 * gets from `bg-blue-dark` today has to exist, unchanged, as a primitive.
 */
export const legacyPalette: Record<string, string> = {
  '--color-black': '--gm-gray-900',
  '--color-white': '--gm-white',
  '--color-gray': '--gm-gray-500',
  '--color-gray-dark': '--gm-gray-700',
  '--color-gray-light': '--gm-gray-200',
  '--color-gray-lightest': '--gm-gray-100',
  '--color-sky': '--gm-sky-300',
  '--color-sky-light': '--gm-sky-200',
  '--color-sky-lightest': '--gm-sky-100',
  '--color-mint': '--gm-mint-300',
  '--color-mint-light': '--gm-mint-200',
  '--color-mint-lightest': '--gm-mint-100',
  '--color-blue': '--gm-blue-500',
  '--color-blue-light': '--gm-sky-300',
  '--color-blue-lightest': '--gm-sky-200',
  '--color-blue-dark': '--gm-blue-900',
  '--color-green': '--gm-green-500',
  '--color-green-dark': '--gm-green-900',
  '--color-green-light': '--gm-mint-300',
  '--color-green-lightest': '--gm-mint-200',
  '--color-red': '--gm-red-500',
  '--color-red-light': '--gm-red-100',
  '--color-orange': '--gm-orange-500',
  '--color-orange-light': '--gm-orange-100',
  '--color-yellow': '--gm-yellow-100',
};
