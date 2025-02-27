// This fixes a in issue with compoennets that we are re-exporting in Grunnmuren. For some reason react-docgen-typescript won't pick
// up the props of those components. If we redeclare dem here, using the prop types from react-aria, it works....
// See extract-component-props.js
import { DisclosureGroupProps, FormProps } from 'react-aria-components';

declare function DisclosureGroup(props: DisclosureGroupProps): unknown;
declare function Form(props: FormProps): unknown;

export {
  DisclosureGroup,
  Form,
}
