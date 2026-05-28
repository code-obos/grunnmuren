# Writing Grunnmuren documentation

Documentation lives in this repo as **MDX** files under `src/content/`. Because
the docs deploy from `main`, you can write and review documentation in the
**same pull request** as the component or change it describes — no separate
after-work pass, and live examples render against the local (workspace) version
of Grunnmuren, so you can document unreleased components.

## Where content lives

```
src/content/
  komponenter/<slug>.mdx   → /komponenter/<slug>
  info/<slug>.mdx          → /<slug>
  <kind>/images/<slug>/…    co-located, optimised images
```

## Frontmatter

```yaml
---
name: 'Card' # page title
slug: 'card' # must match the file name
componentState: stable # unreleased | new | beta | stable | deprecated
propsComponents: # component pages only: auto-generated props tables
  - Card
resourceLinks: # optional GitHub/Figma/npm/other links
  - linkType: github
    url: 'https://…'
---
```

### Component lifecycle and unreleased docs

Grunnmuren components move through these states: `unreleased → beta → new
→ stable → deprecated`. `beta` is for `UNSAFE_`-prefixed exports that are
still maturing; `new` highlights recently-promoted stable components.

Add a component's MDX in the **same PR** as its code. Set
`componentState: unreleased` so the page is hidden from the nav and the
components overview while still being reachable by URL (handy for PR review
links). When the changesets "Version Packages" PR cuts a release, the
[strip-unreleased](./scripts/strip-unreleased.ts) script (hooked into
`ci:version`) flips `unreleased` to either `beta` (if any
`propsComponents` entry is `UNSAFE_`-prefixed) or `new` — so merging that
PR ships the npm release and the nav visibility together, with no manual
follow-up.

## Content building blocks

- **Prose, headings, lists, tables, links** — plain Markdown / GFM.
- **Live, editable examples** — a ` ```tsx ` code fence with the `live` meta
  keyword (and an optional `caption="…"`). The code is rendered against
  Grunnmuren's components via react-live.
- **Static code** — a normal fence (` ```tsx `, ` ```bash `, …). Add
  `caption="…"` to the fence meta if you want a caption.
- **Storybook stories** — `<StorybookEmbed storyId="card--default" />`. The
  story ships with the docs deploy, so add it in the same PR.
- **Images** — `<Image src={img0} alt="…" caption="…" />`; see the Images
  section below.

## Images

Sanity used to optimise images on the fly; in the repo we commit
already-optimised files and keep them small. **Rules (enforced by
`pnpm lint:images` in CI):**

- **Format:** `.webp` for photos/screenshots, `.svg` for diagrams/icons.
- **Size:** ≤ 250 KB per file.
- **Width:** ≤ 2000px.

To add an image:

1. Export/optimise it to WebP (e.g. `cwebp -q 80 in.png -o out.webp`, or
   Squoosh).
2. Put it in `src/content/<kind>/images/<slug>/`.
3. Import it at the top of the MDX file and reference it via the `<Image>`
   component, e.g.: `import diagram from './images/card/diagram.webp';` then
   `<Image src={diagram} alt="Card anatomy" caption="Oppbygning av et kort" />`.
4. Run `pnpm lint:images` to verify the budget.

## Checks

- `pnpm lint:images` — image format/size/width budget.
- `pnpm check:content` — compiles every MDX file (catches syntax errors).
- `pnpm migrate:docs [component:<slug> …]` — (migration helper) regenerate
  MDX from Sanity; omit arguments to migrate everything. Removed once
  Sanity is gone.
