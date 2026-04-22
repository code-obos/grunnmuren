---
'@obosbbl/grunnmuren-react': patch
---

Changed the internal workspace specifier for `@obosbbl/grunnmuren-icons-react` from a pinned semver range to `workspace:^`. The published dependency range is unaffected, but this avoids a `pnpm-lock.yaml` mismatch when changesets bumps the icons-react version.
