"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[766],{"./src/Chip/stories/Chip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Chip/index.tsx"),_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../icons/dist/icons.es.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Chip"};var Default=function Default(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"my-8 mx-4 flex gap-4",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"blue-light",variant:"outline",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__.Zd,{}),children:"Frist for forkjøp 00. måned"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"green-light",variant:"outline",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__.Ux,{}),children:"Medlemstilbud"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"red-light",variant:"outline",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__.v3,{}),children:"Alert"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"orange-light",variant:"outline",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__.Zd,{}),children:"Informasjon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{className:"border-red bg-red",variant:"outline",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_2__.v3,{className:"text-white"}),children:"Egendefinert farge"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"blue-light",children:"Frist for forkjøp 00. måned"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"green-light",children:"Medlemstilbud"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"red-light",children:"Alert"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{color:"orange-light",children:"Informasjon"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.A,{className:"border-red bg-red text-white",children:"Egendefinert farge"})]})]})})};Default.parameters=Object.assign({storySource:{source:'() => {\n  return (\n    <>\n      <div className="my-8 mx-4 flex gap-4">\n        <div className="flex flex-col gap-4">\n          <Chip color="blue-light" variant="outline" icon={<InfoCircle />}>\n            Frist for forkjøp 00. måned\n          </Chip>\n          <Chip color="green-light" variant="outline" icon={<Star />}>\n            Medlemstilbud\n          </Chip>\n          <Chip color="red-light" variant="outline" icon={<Warning />}>\n            Alert\n          </Chip>\n          <Chip color="orange-light" variant="outline" icon={<InfoCircle />}>\n            Informasjon\n          </Chip>\n          <Chip\n            className="border-red bg-red"\n            variant="outline"\n            icon={<Warning className="text-white" />}\n          >\n            Egendefinert farge\n          </Chip>\n        </div>\n        <div className="flex flex-col gap-4">\n          <Chip color="blue-light">Frist for forkjøp 00. måned</Chip>\n          <Chip color="green-light">Medlemstilbud</Chip>\n          <Chip color="red-light">Alert</Chip>\n          <Chip color="orange-light">Informasjon</Chip>\n          <Chip className="border-red bg-red text-white">\n            Egendefinert farge\n          </Chip>\n        </div>\n      </div>\n    </>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]},"./src/Chip/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Chip_Chip});var clsx_m=__webpack_require__("../../node_modules/.pnpm/clsx@1.2.1/node_modules/clsx/dist/clsx.m.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"),chipVariations={"blue-light":"bg-blue-light border-blue-light","red-light":"bg-red-light border-red-light","green-light":"bg-green-light border-green-light","orange-light":"bg-orange-light border-orange-light"},iconColors={"blue-light":"text-blue-dark","red-light":"text-red","green-light":"text-green","orange-light":"text-black"},Chip_Chip=function Chip(props){var className=props.className,color=props.color,icon=props.icon,children=props.children,_props$variant=props.variant,variant=void 0===_props$variant?"filled":_props$variant,chipVariation=color&&chipVariations[color],iconColor=color&&iconColors[color];return(0,jsx_runtime.jsxs)("div",{className:(0,clsx_m.Z)("inline-flex items-center overflow-hidden rounded-lg border-2 font-medium",chipVariation,className),children:[icon&&(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)("px-3 py-2",iconColor),children:icon}),(0,jsx_runtime.jsx)("div",{className:(0,clsx_m.Z)("flex-1 py-2 px-3",{"bg-white":"outline"===variant}),children})]})};Chip_Chip.displayName="Chip";try{Chip_Chip.displayName="Chip",Chip_Chip.__docgenInfo={description:"",displayName:"Chip",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"blue-light"'},{value:'"green-light"'},{value:'"red-light"'},{value:'"orange-light"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"filled"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Chip/Chip.tsx#Chip"]={docgenInfo:Chip_Chip.__docgenInfo,name:"Chip",path:"src/Chip/Chip.tsx#Chip"})}catch(__react_docgen_typescript_loader_error){}try{Chip.displayName="Chip",Chip.__docgenInfo={description:"",displayName:"Chip",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"blue-light"'},{value:'"green-light"'},{value:'"red-light"'},{value:'"orange-light"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"outline"'},{value:'"filled"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Chip/index.tsx#Chip"]={docgenInfo:Chip.__docgenInfo,name:"Chip",path:"src/Chip/index.tsx#Chip"})}catch(__react_docgen_typescript_loader_error){}}}]);