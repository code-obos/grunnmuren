# @obosbbl/grunnmuren-tailwind

Grunnmuren Tailwind preset.

## Install

```sh
npm install -D @obosbbl/grunnmuren-tailwind tailwindcss
```

## Usage

```js
// tailwind.config.js

// Regular usage
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')],
  content: [
    // If using this together with Grunnmuren's React components
    './node_modules/@obosbbl/grunnmuren-react/dist/**/*.js',
    // Add your own content sources as needed, eg:
    './src/components/**/*.{ts,tsx}',
  ],
};
```
