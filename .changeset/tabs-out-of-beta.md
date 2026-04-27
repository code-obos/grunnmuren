---
"@obosbbl/grunnmuren-react": minor
---

Tabs: out of BETA 🚀

The `UNSAFE_` prefix has been removed from `Tabs`, `TabList`, `Tab` and `TabPanel` (and their props types). Update your imports:

### Before
``` tsx
import {
  UNSAFE_Tab as Tab,
  UNSAFE_TabList as TabList,
  UNSAFE_TabPanel as TabPanel,
  UNSAFE_Tabs as Tabs,
} from '@obosbbl/grunnmuren-react';
```

### Now
``` tsx
import { Tab, TabList, TabPanel, Tabs } from '@obosbbl/grunnmuren-react';
```
