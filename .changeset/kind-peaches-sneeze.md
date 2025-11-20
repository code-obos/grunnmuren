---
"@obosbbl/grunnmuren-tailwind": minor
---

## New classes for layout grids
You can now use the classes `layout-grid-gap-x`, `layout-grid`, `layout-grid-container` and `layout-subgrid-1`-`layout-subgrid-12` to set up layout grids pages so that all your content aligns.


### `layout-grid-gap-x`
Defines the layout grid column spacing responsively.

### `layout-grid`
Sets up a responsive 14 column grid with `layout-grid-gap-x`.

### `layout-grid-container`
Combines `layout-grid` with the `container` class, which makes up the new page container.

### `layout-subgrid-1`-`layout-subgrid-12`
Until there is better support for `subgrid` in CSS, you can use these classes to set up subgrids that aligns with `layout-grid`.