---
to: packages/react/<%=name%>/package.json
---

{
  "name": "@obosbbl/grunnmuren-react-<%=name%>",
  "version": "2.0.0",
  "description": "Grunnmuren UI components in React",
  "license": "MIT",
  "main": "dist/main.js",
  "module": "dist/module.js",
  "exports": {
    "types": "./dist/types.d.ts",
    "import": "./dist/import.mjs",
    "require": "./dist/main.js"
  },
  "types": "dist/types.d.ts",
  "source": "src/index.ts",
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "dependencies": {
    "class-variance-authority": "^0.7.0"
  }
}