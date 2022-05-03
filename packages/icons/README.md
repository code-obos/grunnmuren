# @obosbbl/grunnmuren-icons

Grunnmuren's icon set as SVGs.

## Install

```sh
npm install @obosbbl/grunnmuren-icons
```

## Updating the icons

The icons should never be edited manually, as the source of truth is in [Figma](https://www.figma.com/file/XRHRRytz9DqrDkWpE4IKVB/OBOS-DS?node-id=2192%3A33204).

### Figma access token

If you are running the import script for the first time, it will prompt your for a [Figma access token](https://www.figma.com/developers/api#access-tokens). The token is is required to access Figma's API. It can be generated on your Figma account settings page.

The import script may store the token to a local file, so you won't have to supply the token again on subsequent runs.

### Import script

To update the icons, run the following scripts. If it has a valid Figma access token (see above), it will proceed to download all the icons as SVG files.

```
pnpm run update
pnpm run optimize
```

## Troubleshooting

### Auth

If the scripts authentication issues, you could try to create a new access token and delete the local file `.FIGMA_TOKEN` before running the script again.
