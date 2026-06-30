---
"@obosbbl/grunnmuren-react": minor
---

Add a `Header` component for `Modal`/`Drawer` (beta) so the header and footer can be styled freely via `className` (e.g. made sticky or given a background). A `Heading` inside `Header` no longer needs `slot="title"` — the title styling and the dialog's accessible name (`aria-labelledby`) are wired automatically. The close button is no longer auto-injected; place a bare `<Button slot="close" />` inside the `Header` and its icon, variant and `aria-label` are injected for you.

Migration (beta): wrap the title in `Header`, drop `slot="title"`, and add a `<Button slot="close" />`.

```diff
- <Heading slot="title" level={2}>Tittel</Heading>
+ <Header>
+   <Heading level={2}>Tittel</Heading>
+   <Button slot="close" />
+ </Header>
```
