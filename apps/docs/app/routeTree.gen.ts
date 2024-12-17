/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StudioImport } from './routes/studio'
import { Route as DocsImport } from './routes/_docs'
import { Route as DocsIndexImport } from './routes/_docs/index'
import { Route as DocsIkonerImport } from './routes/_docs/ikoner'
import { Route as DocsKomponenterButtonImport } from './routes/_docs/komponenter/button'
import { Route as DocsKomponenterBadgeImport } from './routes/_docs/komponenter/badge'

// Create/Update Routes

const StudioRoute = StudioImport.update({
  id: '/studio',
  path: '/studio',
  getParentRoute: () => rootRoute,
} as any)

const DocsRoute = DocsImport.update({
  id: '/_docs',
  getParentRoute: () => rootRoute,
} as any)

const DocsIndexRoute = DocsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DocsRoute,
} as any)

const DocsIkonerRoute = DocsIkonerImport.update({
  id: '/ikoner',
  path: '/ikoner',
  getParentRoute: () => DocsRoute,
} as any)

const DocsKomponenterButtonRoute = DocsKomponenterButtonImport.update({
  id: '/komponenter/button',
  path: '/komponenter/button',
  getParentRoute: () => DocsRoute,
} as any)

const DocsKomponenterBadgeRoute = DocsKomponenterBadgeImport.update({
  id: '/komponenter/badge',
  path: '/komponenter/badge',
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
    '/studio': {
      id: '/studio'
      path: '/studio'
      fullPath: '/studio'
      preLoaderRoute: typeof StudioImport
      parentRoute: typeof rootRoute
    }
    '/_docs/ikoner': {
      id: '/_docs/ikoner'
      path: '/ikoner'
      fullPath: '/ikoner'
      preLoaderRoute: typeof DocsIkonerImport
      parentRoute: typeof DocsImport
    }
    '/_docs/': {
      id: '/_docs/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof DocsIndexImport
      parentRoute: typeof DocsImport
    }
    '/_docs/komponenter/badge': {
      id: '/_docs/komponenter/badge'
      path: '/komponenter/badge'
      fullPath: '/komponenter/badge'
      preLoaderRoute: typeof DocsKomponenterBadgeImport
      parentRoute: typeof DocsImport
    }
    '/_docs/komponenter/button': {
      id: '/_docs/komponenter/button'
      path: '/komponenter/button'
      fullPath: '/komponenter/button'
      preLoaderRoute: typeof DocsKomponenterButtonImport
      parentRoute: typeof DocsImport
    }
  }
}

// Create and export the route tree

interface DocsRouteChildren {
  DocsIkonerRoute: typeof DocsIkonerRoute
  DocsIndexRoute: typeof DocsIndexRoute
  DocsKomponenterBadgeRoute: typeof DocsKomponenterBadgeRoute
  DocsKomponenterButtonRoute: typeof DocsKomponenterButtonRoute
}

const DocsRouteChildren: DocsRouteChildren = {
  DocsIkonerRoute: DocsIkonerRoute,
  DocsIndexRoute: DocsIndexRoute,
  DocsKomponenterBadgeRoute: DocsKomponenterBadgeRoute,
  DocsKomponenterButtonRoute: DocsKomponenterButtonRoute,
}

const DocsRouteWithChildren = DocsRoute._addFileChildren(DocsRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof DocsRouteWithChildren
  '/studio': typeof StudioRoute
  '/ikoner': typeof DocsIkonerRoute
  '/': typeof DocsIndexRoute
  '/komponenter/badge': typeof DocsKomponenterBadgeRoute
  '/komponenter/button': typeof DocsKomponenterButtonRoute
}

export interface FileRoutesByTo {
  '/studio': typeof StudioRoute
  '/ikoner': typeof DocsIkonerRoute
  '/': typeof DocsIndexRoute
  '/komponenter/badge': typeof DocsKomponenterBadgeRoute
  '/komponenter/button': typeof DocsKomponenterButtonRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_docs': typeof DocsRouteWithChildren
  '/studio': typeof StudioRoute
  '/_docs/ikoner': typeof DocsIkonerRoute
  '/_docs/': typeof DocsIndexRoute
  '/_docs/komponenter/badge': typeof DocsKomponenterBadgeRoute
  '/_docs/komponenter/button': typeof DocsKomponenterButtonRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/studio'
    | '/ikoner'
    | '/'
    | '/komponenter/badge'
    | '/komponenter/button'
  fileRoutesByTo: FileRoutesByTo
  to: '/studio' | '/ikoner' | '/' | '/komponenter/badge' | '/komponenter/button'
  id:
    | '__root__'
    | '/_docs'
    | '/studio'
    | '/_docs/ikoner'
    | '/_docs/'
    | '/_docs/komponenter/badge'
    | '/_docs/komponenter/button'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  DocsRoute: typeof DocsRouteWithChildren
  StudioRoute: typeof StudioRoute
}

const rootRouteChildren: RootRouteChildren = {
  DocsRoute: DocsRouteWithChildren,
  StudioRoute: StudioRoute,
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
        "/studio"
      ]
    },
    "/_docs": {
      "filePath": "_docs.tsx",
      "children": [
        "/_docs/ikoner",
        "/_docs/",
        "/_docs/komponenter/badge",
        "/_docs/komponenter/button"
      ]
    },
    "/studio": {
      "filePath": "studio.tsx"
    },
    "/_docs/ikoner": {
      "filePath": "_docs/ikoner.tsx",
      "parent": "/_docs"
    },
    "/_docs/": {
      "filePath": "_docs/index.tsx",
      "parent": "/_docs"
    },
    "/_docs/komponenter/badge": {
      "filePath": "_docs/komponenter/badge.tsx",
      "parent": "/_docs"
    },
    "/_docs/komponenter/button": {
      "filePath": "_docs/komponenter/button.tsx",
      "parent": "/_docs"
    }
  }
}
ROUTE_MANIFEST_END */
