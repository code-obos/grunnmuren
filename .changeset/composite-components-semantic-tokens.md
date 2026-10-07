---
'@obosbbl/grunnmuren-react': minor
---

Button, Alertbox, Card, Carousel, Accordion, Modal, Drawer, Table, Tabs and ProgressBar now read the role tokens instead of the palette, so they follow a `data-theme`. This is the one that moves the most pixels:

- the primary button stays dark blue. Hover still goes lighter, a step less than today (blue-500 to blue-700), and pressed goes from a hardcoded blue to blue-800
- `active:[#9ddac6]` on the mint button was never a valid class and never rendered, so nothing changes there yet. When mint moves, a pressed state shows up where there wasn't one
- the white button's pressed state is now darker than its hover
- the alertbox borders go from hardcoded values to blue-500, green-500 and orange-700, the warning background to orange-100 and the info background a step lighter

The mint button stays on the palette for now. All of the above still pass WCAG AA.
