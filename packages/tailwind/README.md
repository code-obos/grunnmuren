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
  // ...
};

// Usage with options
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')({ useLegacyFont: true }),
  // ...
};
```

### Fonts

The preset includes font declarations. You'll have to setup your app so it serves the necessary font files at the path `/fonts/`. See the [preset implementation](./tailwind-base.cjs).

## Options

The preset supports the following options:

| Name          | Default value | Description                                  |
| ------------- | ------------- | -------------------------------------------- |
| useLegacyFont | `false`       | Whether to use the fonts from the old design |
