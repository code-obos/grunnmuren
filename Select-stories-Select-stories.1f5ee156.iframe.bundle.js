"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[439],{"./src/Select/stories/Select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.map.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Select/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Select",parameters:{layout:"padded"}};var options=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],Default=function Default(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{className:"flex flex-col gap-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.P,{children:options.map((function(option){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{value:option.key,children:option.value},option.key)}))})})};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'() => {\n  return (\n    <div className="flex flex-col gap-4">\n      <Select>\n        {options.map((option) => (\n          <option key={option.key} value={option.key}>\n            {option.value}\n          </option>\n        ))}\n      </Select>\n    </div>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]},"./src/Select/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{P:()=>Select_Select});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/.pnpm/clsx@1.2.0/node_modules/clsx/dist/clsx.m.js"),icons_es=__webpack_require__("../icons/dist/icons.es.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"),_excluded=["children","className"];function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var Select_Select=(0,react.forwardRef)((function(props,ref){var children=props.children,className=props.className,rest=_objectWithoutProperties(props,_excluded);return(0,jsx_runtime.jsxs)("div",{className:(0,clsx_m.Z)("relative",className),children:[(0,jsx_runtime.jsx)("select",Object.assign({},rest,{className:"focus:border-blue border-gray-dark w-full appearance-none rounded-lg border-2 border-solid bg-white px-4 py-3 focus:outline-none",ref,children})),(0,jsx_runtime.jsx)(icons_es._M,{className:"absolute top-4 right-4"})]})}));try{Select_Select.displayName="Select",Select_Select.__docgenInfo={description:"",displayName:"Select",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Select/Select.tsx#Select"]={docgenInfo:Select_Select.__docgenInfo,name:"Select",path:"src/Select/Select.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}try{Select.displayName="Select",Select.__docgenInfo={description:"",displayName:"Select",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Select/index.tsx#Select"]={docgenInfo:Select.__docgenInfo,name:"Select",path:"src/Select/index.tsx#Select"})}catch(__react_docgen_typescript_loader_error){}}}]);