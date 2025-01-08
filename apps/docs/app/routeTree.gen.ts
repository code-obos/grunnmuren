/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DocsImport } from './routes/_docs'
import { Route as DocsIndexImport } from './routes/_docs/index'
import { Route as StudioSplatImport } from './routes/studio/$'
import { Route as DocsKomponenterIndexImport } from './routes/_docs/komponenter/index'
import { Route as DocsProfilIkonerImport } from './routes/_docs/profil/ikoner'
import { Route as DocsProfilFargerImport } from './routes/_docs/profil/farger'
import { Route as DocsKomponenterSlugImport } from './routes/_docs/komponenter/$slug'

// Create/Update Routes

const DocsRoute = DocsImport.update({
  id: '/_docs',
  getParentRoute: () => rootRoute,
} as any)

const DocsIndexRoute = DocsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DocsRoute,
} as any)

const StudioSplatRoute = StudioSplatImport.update({
  id: '/studio/$',
  path: '/studio/$',
  getParentRoute: () => rootRoute,
} as any)

const DocsKomponenterIndexRoute = DocsKomponenterIndexImport.update({
  id: '/komponenter/',
  path: '/komponenter/',
  getParentRoute: () => DocsRoute,
} as any)

const DocsProfilIkonerRoute = DocsProfilIkonerImport.update({
  id: '/profil/ikoner',
  path: '/profil/ikoner',
  getParentRoute: () => DocsRoute,
} as any)

const DocsProfilFargerRoute = DocsProfilFargerImport.update({
  id: '/profil/farger',
  path: '/profil/farger',
  getParentRoute: () => DocsRoute,
} as any)

const DocsKomponenterSlugRoute = DocsKomponenterSlugImport.update({
  id: '/komponenter/$slug',
  path: '/komponenter/$slug',
  getParentRoute: () => DocsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_docs': {
      id: '/_docs'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DocsImport
      parentRoute: typeof rootRoute
    }
    '/studio/$': {
      id: '/studio/$'
      path: '/studio/$'
      fullPath: '/studio/$'
      preLoaderRoute: typeof StudioSplatImport
      parentRoute: typeof rootRoute
    }
    '/_docs/': {
      id: '/_docs/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DocsIndexImport
      parentRoute: typeof DocsImport
    }
    '/_docs/komponenter/$slug': {
      id: '/_docs/komponenter/$slug'
      path: '/komponenter/$slug'
      fullPath: '/komponenter/$slug'
      preLoaderRoute: typeof DocsKomponenterSlugImport
      parentRoute: typeof DocsImport
    }
    '/_docs/profil/farger': {
      id: '/_docs/profil/farger'
      path: '/profil/farger'
      fullPath: '/profil/farger'
      preLoaderRoute: typeof DocsProfilFargerImport
      parentRoute: typeof DocsImport
    }
    '/_docs/profil/ikoner': {
      id: '/_docs/profil/ikoner'
      path: '/profil/ikoner'
      fullPath: '/profil/ikoner'
      preLoaderRoute: typeof DocsProfilIkonerImport
      parentRoute: typeof DocsImport
    }
    '/_docs/komponenter/': {
      id: '/_docs/komponenter/'
      path: '/komponenter'
      fullPath: '/komponenter'
      preLoaderRoute: typeof DocsKomponenterIndexImport
      parentRoute: typeof DocsImport
    }
  }
}

// Create and export the route tree

interface DocsRouteChildren {
  DocsIndexRoute: typeof DocsIndexRoute
  DocsKomponenterSlugRoute: typeof DocsKomponenterSlugRoute
  DocsProfilFargerRoute: typeof DocsProfilFargerRoute
  DocsProfilIkonerRoute: typeof DocsProfilIkonerRoute
  DocsKomponenterIndexRoute: typeof DocsKomponenterIndexRoute
}

const DocsRouteChildren: DocsRouteChildren = {
  DocsIndexRoute: DocsIndexRoute,
  DocsKomponenterSlugRoute: DocsKomponenterSlugRoute,
  DocsProfilFargerRoute: DocsProfilFargerRoute,
  DocsProfilIkonerRoute: DocsProfilIkonerRoute,
  DocsKomponenterIndexRoute: DocsKomponenterIndexRoute,
}

const DocsRouteWithChildren = DocsRoute._addFileChildren(DocsRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof DocsRouteWithChildren
  '/studio/$': typeof StudioSplatRoute
  '/': typeof DocsIndexRoute
  '/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/profil/farger': typeof DocsProfilFargerRoute
  '/profil/ikoner': typeof DocsProfilIkonerRoute
  '/komponenter': typeof DocsKomponenterIndexRoute
}

export interface FileRoutesByTo {
  '/studio/$': typeof StudioSplatRoute
  '/': typeof DocsIndexRoute
  '/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/profil/farger': typeof DocsProfilFargerRoute
  '/profil/ikoner': typeof DocsProfilIkonerRoute
  '/komponenter': typeof DocsKomponenterIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_docs': typeof DocsRouteWithChildren
  '/studio/$': typeof StudioSplatRoute
  '/_docs/': typeof DocsIndexRoute
  '/_docs/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/_docs/profil/farger': typeof DocsProfilFargerRoute
  '/_docs/profil/ikoner': typeof DocsProfilIkonerRoute
  '/_docs/komponenter/': typeof DocsKomponenterIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/studio/$'
    | '/'
    | '/komponenter/$slug'
    | '/profil/farger'
    | '/profil/ikoner'
    | '/komponenter'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/studio/$'
    | '/'
    | '/komponenter/$slug'
    | '/profil/farger'
    | '/profil/ikoner'
    | '/komponenter'
  id:
    | '__root__'
    | '/_docs'
    | '/studio/$'
    | '/_docs/'
    | '/_docs/komponenter/$slug'
    | '/_docs/profil/farger'
    | '/_docs/profil/ikoner'
    | '/_docs/komponenter/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  DocsRoute: typeof DocsRouteWithChildren
  StudioSplatRoute: typeof StudioSplatRoute
}

const rootRouteChildren: RootRouteChildren = {
  DocsRoute: DocsRouteWithChildren,
  StudioSplatRoute: StudioSplatRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_docs",
        "/studio/$"
      ]
    },
    "/_docs": {
      "filePath": "_docs.tsx",
      "children": [
        "/_docs/",
        "/_docs/komponenter/$slug",
        "/_docs/profil/farger",
        "/_docs/profil/ikoner",
        "/_docs/komponenter/"
      ]
    },
    "/studio/$": {
      "filePath": "studio/$.tsx"
    },
    "/_docs/": {
      "filePath": "_docs/index.tsx",
      "parent": "/_docs"
    },
    "/_docs/komponenter/$slug": {
      "filePath": "_docs/komponenter/$slug.tsx",
      "parent": "/_docs"
    },
    "/_docs/profil/farger": {
      "filePath": "_docs/profil/farger.tsx",
      "parent": "/_docs"
    },
    "/_docs/profil/ikoner": {
      "filePath": "_docs/profil/ikoner.tsx",
      "parent": "/_docs"
    },
    "/_docs/komponenter/": {
      "filePath": "_docs/komponenter/index.tsx",
      "parent": "/_docs"
    }
  }
}
ROUTE_MANIFEST_END */
