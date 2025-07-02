---
"@obosbbl/grunnmuren-react": major
---

Changes background colors on buttons. The `green` color prop value is now replaced by `blue`. So upgrading to this version means you have to migrate any `<Button color="green">` to `<Button color="blue">`. You also have to make sure the new colors have sufficent contranst against your backgrounds.

Buttons like these will need a visual check against their backgrounds:
- <Button>
- <Button variant="primary">
- <Button color="blue">
- <Button color="blue" variant="primary" >
- <Button variant="secondary">
- <Button color="blue" variant="secondary">


Since `blue` is the new default for `color`, you *probably* only have <Button> or <Button variant="secondary"> and maybe <Button variant="primary"> in your code base. As the rest of the combinations would be verbose considering the the defaults.