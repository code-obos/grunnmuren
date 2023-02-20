"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[793],{"../../node_modules/.pnpm/@seznam+compose-react-refs@1.0.6/node_modules/@seznam/compose-react-refs/composeRefs.js":(__unused_webpack_module,exports)=>{exports.Z=function composeRefs(){for(var refs=[],_i=0;_i<arguments.length;_i++)refs[_i]=arguments[_i];if(2===refs.length)return composeTwoRefs(refs[0],refs[1])||null;var composedRef=refs.slice(1).reduce((function(semiCombinedRef,refToInclude){return composeTwoRefs(semiCombinedRef,refToInclude)}),refs[0]);return composedRef||null};var composedRefCache=new WeakMap;function composeTwoRefs(ref1,ref2){if(ref1&&ref2){var ref1Cache=composedRefCache.get(ref1)||new WeakMap;composedRefCache.set(ref1,ref1Cache);var composedRef=ref1Cache.get(ref2)||function(instance){updateRef(ref1,instance),updateRef(ref2,instance)};return ref1Cache.set(ref2,composedRef),composedRef}return ref1||ref2}function updateRef(ref,instance){"function"==typeof ref?ref(instance):ref.current=instance}},"./src/Alert/stories/Alert.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Alert/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Alert"};var heading="Vedlikehold på IT-systemer kan påvirke nettsiden",text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",Default=function Default(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.b,{heading,children:text}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.b,{heading,severity:"info",children:text})]})};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'() => {\n  return (\n    <div className="flex flex-col gap-4">\n      <Alert heading={heading}>{text}</Alert>\n      <Alert heading={heading} severity="info">\n        {text}\n      </Alert>\n    </div>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]},"./src/Alert/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{b:()=>Alert});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var utils=__webpack_require__("./src/utils/index.ts"),icons=__webpack_require__("../icons/dist/icons.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"),_excluded=["className","children","heading","severity"];function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var Alert=function Alert(props){var className=props.className,children=props.children,heading=props.heading,_props$severity=props.severity,severity=void 0===_props$severity?"alert":_props$severity,rest=_objectWithoutProperties(props,_excluded);return(0,jsx_runtime.jsx)("section",Object.assign({className:(0,utils.cx)(className,"p-4 md:py-8",{"bg-orange-light":"info"===severity,"bg-red-light":"alert"===severity}),role:"alert"},rest,{children:(0,jsx_runtime.jsxs)("div",{className:"flex justify-center",children:[(0,jsx_runtime.jsx)(AlertIcon,{className:"mr-4 flex-none md:mr-8 md:text-2xl",severity}),(0,jsx_runtime.jsxs)("div",{className:"w-prose flex-initial",children:[(0,jsx_runtime.jsx)("h2",{className:"h4 mb-2",children:heading}),children]})]})}))};Alert.displayName="Alert";var AlertIcon=function AlertIcon(_ref){var severity=_ref.severity,className=_ref.className;return"alert"===severity?(0,jsx_runtime.jsx)(icons.Warning,{className:(0,utils.cx)(className,"text-red")}):(0,jsx_runtime.jsx)(icons.InfoCircle,{className:(0,utils.cx)(className,"text-orange")})};AlertIcon.displayName="AlertIcon";try{Alert.displayName="Alert",Alert.__docgenInfo={description:"",displayName:"Alert",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},heading:{defaultValue:null,description:"",name:"heading",required:!0,type:{name:"string"}},severity:{defaultValue:{value:"alert"},description:"",name:"severity",required:!1,type:{name:"enum",value:[{value:'"alert"'},{value:'"info"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Alert/Alert.tsx#Alert"]={docgenInfo:Alert.__docgenInfo,name:"Alert",path:"src/Alert/Alert.tsx#Alert"})}catch(__react_docgen_typescript_loader_error){}},"./src/utils/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}__webpack_require__.d(__webpack_exports__,{F:()=>composeRefs.Z,cx:()=>clsx_m,Z:()=>noop});const clsx_m=function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n};var composeRefs=__webpack_require__("../../node_modules/.pnpm/@seznam+compose-react-refs@1.0.6/node_modules/@seznam/compose-react-refs/composeRefs.js"),noop=function noop(){}},"../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.index-of.js":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{var $=__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/internals/export.js"),uncurryThis=__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/internals/function-uncurry-this.js"),$IndexOf=__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/internals/array-includes.js").indexOf,arrayMethodIsStrict=__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/internals/array-method-is-strict.js"),un$IndexOf=uncurryThis([].indexOf),NEGATIVE_ZERO=!!un$IndexOf&&1/un$IndexOf([1],1,-0)<0,STRICT_METHOD=arrayMethodIsStrict("indexOf");$({target:"Array",proto:!0,forced:NEGATIVE_ZERO||!STRICT_METHOD},{indexOf:function indexOf(searchElement){var fromIndex=arguments.length>1?arguments[1]:void 0;return NEGATIVE_ZERO?un$IndexOf(this,searchElement,fromIndex)||0:$IndexOf(this,searchElement,fromIndex)}})}}]);