import { addons } from 'storybook/manager-api';

// Allows us to place CheckboxGroup under Checkbox as a folder instead of a new root
// https://storybook.js.org/docs/react/configure/sidebar-and-urls#roots
addons.setConfig({
  sidebar: {
    showRoots: false,
  },
});
