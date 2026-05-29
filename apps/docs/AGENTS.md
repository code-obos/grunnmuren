# Grunnmuren docs — agent rules

Documentation is **MDX** in `src/content/` (`komponenter/<slug>.mdx`,
`info/<slug>.mdx`). It deploys from `main`, so write docs in the **same PR** as
the code they describe. Full guide: [CONTRIBUTING.md](./CONTRIBUTING.md).

## Images — always optimise before committing

The repo has no CDN image optimisation. Enforced by `pnpm lint:images` (CI):

- **Format:** `.webp` (photos/screenshots) or `.svg` (diagrams/icons) — never commit `.png`/`.jpg`.
- **Size:** ≤ 250 KB. **Width:** ≤ 2000px.
- Store under `src/content/<kind>/images/<slug>/`, import in the MDX, render with `<Image src={…} alt="…" caption="…" />`.
- Convert e.g. with `cwebp -q 80 in.png -o out.webp`; lower `-q` if over budget.

Run `pnpm lint:images` and `pnpm --filter @obosbbl/grunnmuren-docs run build` after editing content.

## Content conventions

- Live example: ` ```tsx live caption="…" ` → editable react-live preview.
- Static code: a normal fenced block (` ```tsx `, ` ```bash `).
- Storybook embed: `<StorybookEmbed storyId="…" />` (add the story in the same PR).
- Metadata (name, slug, componentState, propsComponents, resourceLinks) goes in YAML frontmatter. Lifecycle: `unreleased → beta → new → stable → deprecated` (`beta` ⇔ any `UNSAFE_`-prefixed entry in `propsComponents`). For a component documented in the same PR as its code, set `componentState: unreleased` — the page is hidden from the nav until changesets cuts a release; the `ci:version` hook then flips it to `beta` or `new` automatically.
