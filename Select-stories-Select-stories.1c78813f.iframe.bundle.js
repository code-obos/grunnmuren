"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[439],{"./src/Select/stories/Select.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.map.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Select/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}};var options=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],Default=function Default(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(___WEBPACK_IMPORTED_MODULE_2__.P,Object.assign({},props,{label:"Velg område",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{value:"",children:"Velg område"}),options.map((function(option){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("option",{value:option.key,children:option.value},option.key)}))]}))};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'(props: SelectProps) => {\n  return (\n    <Select {...props} label="Velg område">\n      <option value="">Velg område</option>\n      {options.map((option) => (\n        <option key={option.key} value={option.key}>\n          {option.value}\n        </option>\n      ))}\n    </Select>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"];try{Default.displayName="Default",Default.__docgenInfo={description:"",displayName:"Default",props:{children:{defaultValue:null,description:"Collection of <option />-elements",name:"children",required:!0,type:{name:"ReactNode"}},description:{defaultValue:null,description:"Help text for the form control",name:"description",required:!1,type:{name:"ReactNode"}},disableValidation:{defaultValue:null,description:"Disables the built in HTML5 validation. If using custom validation for an entire form, consider setting `noValidate` on the form element instead. @default false",name:"disableValidation",required:!1,type:{name:"boolean"}},error:{defaultValue:null,description:"Error message for the form control",name:"error",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"Label for the form control",name:"label",required:!0,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"Changes font-size, padding and gaps",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Select/stories/Select.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/Select/stories/Select.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}}}]);