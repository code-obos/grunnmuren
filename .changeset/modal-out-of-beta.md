---
"@obosbbl/grunnmuren-react": minor
---

Modal: out of BETA 🚀

The `UNSAFE_` prefix has been removed from `Modal`, `Dialog` and `DialogTrigger` (and their props types). Update your imports:

### Before
``` tsx
import { UNSAFE_Modal as Modal } from '@obosbbl/grunnmuren-react';
```

### Now
``` tsx
import { Modal } from '@obosbbl/grunnmuren-react';
```
