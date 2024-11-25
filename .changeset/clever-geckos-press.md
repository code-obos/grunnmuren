---
'@obosbbl/grunnmuren-react': minor
---

Button: deprecate isLoading in favor of isPending

* change prop name to align with React Aria and the useActionState hook in React.
* improved accessibility for pending state by [utilizing React aria](https://react-spectrum.adobe.com/react-aria/Button.html#pending)
* button events are now disabled when the button is in a pending state.
* refactor to CSS instead of useLayoutEffect when button is in a pending state.

