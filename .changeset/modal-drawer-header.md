---
"@obosbbl/grunnmuren-react": minor
---

Add a `Header` component so the header and footer of `Modal`/`Drawer` (beta) can be styled freely via `className`, e.g. made sticky or given a background. A `Heading` inside `Header` no longer needs `slot="title"` — the title styling and the dialog's accessible name are wired automatically.

Migration (beta): wrap the title in `Header` and drop `slot="title"`.

```diff
- <Heading slot="title" level={2}>Tittel</Heading>
+ <Header>
+   <Heading level={2}>Tittel</Heading>
+ </Header>
```
