---
"@obosbbl/grunnmuren-react": minor
---

Link: out of BETA 🚀

The `UNSAFE_` prefix has been removed from `Link` (and its props type). Update your imports:

### Before
``` tsx
import { UNSAFE_Link as Link } from '@obosbbl/grunnmuren-react';
```

### Now
``` tsx
import { Link } from '@obosbbl/grunnmuren-react';
```
