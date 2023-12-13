import preserveDirectives from 'rollup-preserve-directives';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/button/Button.tsx',
    './src/checkbox/index.ts',
    './src/combobox/index.ts',
    './src/label/index.ts',
    './src/radiogroup/index.ts',
    './src/select/index.ts',
    './src/textfield/index.ts',
  ],

  // Generate declaration files
  declaration: true,
  rollup: {
    esbuild: {
      jsx: 'automatic',
    },
  },
  hooks: {
    // Add rollup plugin that preserves client directives
    'rollup:options'(_ctx, options) {
      if (Array.isArray(options.plugins)) {
        options.plugins.push(preserveDirectives());
      }
    },
    // Remove the plugin before generating type declarations
    'rollup:dts:options'(_ctx, options) {
      if (Array.isArray(options.plugins)) {
        options.plugins = options.plugins.filter((plugin) => {
          return (
            plugin && 'name' in plugin && plugin.name !== 'preserve-directives'
          );
        });
      }
    },
  },
});
