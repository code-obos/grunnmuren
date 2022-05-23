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

// Usage with options
module.exports = {
  presets: [require('@obosbbl/grunnmuren-tailwind')({ useLegacyFont: true, fontBasePath: '/mypath/myfonts' }),
  // content: [ ... ]
};
```

### Fonts

The preset includes font declarations.
You'll have to setup your app so it serves the necessary [font files](../react/public/fonts/).
By default the fonts should be under `/fonts/` but you can override this with the config option `fontBasePath`.
See the [preset implementation](./tailwind-base.cjs).

## Options

The preset supports the following options:

| Name          | Default value | Description                                  |
| ------------- | ------------- | -------------------------------------------- |
| useLegacyFont | `false`       | Whether to use the fonts from the old design |
| fontBasePath  | `/fonts`      | Path to where the fonts are hosted           |
