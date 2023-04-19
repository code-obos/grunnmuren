'use client';
import{R as o}from"./index-9a95590f.js";const u=o.createContext({});function l(t){return e;function e(r){const n=i(r.components);return o.createElement(t,{...r,allComponents:n})}}function i(t){const e=o.useContext(u);return o.useMemo(()=>typeof t=="function"?t(e):{...e,...t},[e,t])}const c={};function C({components:t,children:e,disableParentContext:r}){let n;return r?n=typeof t=="function"?t({}):t||c:n=i(t),o.createElement(u.Provider,{value:n},e)}export{u as MDXContext,C as MDXProvider,i as useMDXComponents,l as withMDXComponents};
//# sourceMappingURL=index-35eeafcd.js.map
