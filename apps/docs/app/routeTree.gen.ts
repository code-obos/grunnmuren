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
import { Route as DocsIkonerImport } from './routes/_docs/ikoner'
import { Route as DocsKomponenterIndexImport } from './routes/_docs/komponenter/index'
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

const DocsIkonerRoute = DocsIkonerImport.update({
  id: '/ikoner',
  path: '/ikoner',
  getParentRoute: () => DocsRoute,
} as any)

const DocsKomponenterIndexRoute = DocsKomponenterIndexImport.update({
  id: '/komponenter/',
  path: '/komponenter/',
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
    '/_docs/ikoner': {
      id: '/_docs/ikoner'
      path: '/ikoner'
      fullPath: '/ikoner'
      preLoaderRoute: typeof DocsIkonerImport
      parentRoute: typeof DocsImport
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
  DocsKomponenterIndexRoute: typeof DocsKomponenterIndexRoute
}

const DocsRouteChildren: DocsRouteChildren = {
  DocsIndexRoute: DocsIndexRoute,
  DocsKomponenterSlugRoute: DocsKomponenterSlugRoute,
  DocsKomponenterIndexRoute: DocsKomponenterIndexRoute,
}

const DocsRouteWithChildren = DocsRoute._addFileChildren(DocsRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof DocsRouteWithChildren
  '/ikoner': typeof DocsIkonerRoute
  '/studio/$': typeof StudioSplatRoute
  '/': typeof DocsIndexRoute
  '/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/komponenter': typeof DocsKomponenterIndexRoute
}

export interface FileRoutesByTo {
  '/ikoner': typeof DocsIkonerRoute
  '/studio/$': typeof StudioSplatRoute
  '/': typeof DocsIndexRoute
  '/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/komponenter': typeof DocsKomponenterIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_docs': typeof DocsRouteWithChildren
  '/_docs/ikoner': typeof DocsIkonerRoute
  '/studio/$': typeof StudioSplatRoute
  '/_docs/': typeof DocsIndexRoute
  '/_docs/komponenter/$slug': typeof DocsKomponenterSlugRoute
  '/_docs/komponenter/': typeof DocsKomponenterIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/ikoner'
    | '/studio/$'
    | '/'
    | '/komponenter/$slug'
    | '/komponenter'
  fileRoutesByTo: FileRoutesByTo
  to: '/ikoner' | '/studio/$' | '/' | '/komponenter/$slug' | '/komponenter'
  id:
    | '__root__'
    | '/_docs'
    | '/_docs/ikoner'
    | '/studio/$'
    | '/_docs/'
    | '/_docs/komponenter/$slug'
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
        "/_docs/komponenter/"
      ]
    },
    "/_docs/ikoner": {
      "filePath": "_docs/ikoner.tsx",
      "parent": "/_docs"
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
    "/_docs/komponenter/": {
      "filePath": "_docs/komponenter/index.tsx",
      "parent": "/_docs"
    }
  }
}
ROUTE_MANIFEST_END */
