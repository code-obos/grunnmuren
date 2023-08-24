---
to: packages/components/<%=name%>/package.json
---
{
  "name": "@obosbbl/grunnmuren-react-<%=name%>",
  "version": "1.0.0",
  "description": "Grunnmuren components in React",
  "license": "MIT",
  "main": "dist/index.mjs",
  "module": "dist/index.mjs",
  "type": "module",
  "exports": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.mjs"
  },
  "scripts": {
    "build": "unbuild"
  },
  "sideEffects": false,
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "repository": {
    "url": "https://github.com/code-obos/grunnmuren"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0"
  },
  "peerDependencies": {
    "react": "^18"
  }
}