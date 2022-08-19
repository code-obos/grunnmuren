"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[136],{"./src/Button/stories/Button.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.values.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.map.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../icons/dist/icons.es.js"),___WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./src/Button/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"),Composition={Text:"Text",Icon:"Icon",TextIcon:"Text Icon",IconText:"Icon Text"};const __WEBPACK_DEFAULT_EXPORT__={title:"Button",argTypes:{composition:{options:Object.values(Composition),control:"select",defaultValue:Composition.Text},disabled:{control:"boolean"}}};var Default=function Default(props){var composition=props.composition,disabled=props.disabled,ButtonContent=function ButtonContent(_ref){var children=_ref.children;switch(composition){case Composition.Icon:return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_4__.TX,{});case Composition.TextIcon:return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[children,(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_4__.TX,{})]});case Composition.IconText:return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_obosbbl_grunnmuren_icons__WEBPACK_IMPORTED_MODULE_4__.TX,{}),children]});default:return children}},buttons=[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(___WEBPACK_IMPORTED_MODULE_5__.z,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonContent,{children:"Button"})},"button"),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(___WEBPACK_IMPORTED_MODULE_5__.z,{href:"#",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonContent,{children:"Link"})},"link")];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonsDisplayer,{buttonProps:{disabled},children:buttons}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"bg-green-dark py-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonsDisplayer,{buttonProps:{color:"light-green",disabled},children:buttons})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",{className:"bg-blue py-4",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonsDisplayer,{buttonProps:{color:"white",disabled},children:buttons})})]})},ButtonsDisplayer=function ButtonsDisplayer(props){var children=props.children,_props$buttonProps=props.buttonProps,buttonProps=void 0===_props$buttonProps?{}:_props$buttonProps;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonSpacer,{children:react__WEBPACK_IMPORTED_MODULE_3__.Children.map(children,(function(button){return(0,react__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(button,buttonProps)}))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(ButtonSpacer,{children:react__WEBPACK_IMPORTED_MODULE_3__.Children.map(children,(function(button){return(0,react__WEBPACK_IMPORTED_MODULE_3__.cloneElement)(button,Object.assign({variant:"secondary"},buttonProps))}))})]})},ButtonSpacer=function ButtonSpacer(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div",Object.assign({className:"my-8 flex flex-row justify-center gap-8"},props))};ButtonSpacer.displayName="ButtonSpacer",Default.parameters=Object.assign({storySource:{source:'(props: {\n  composition: CompositionValue;\n  disabled: boolean;\n}) => {\n  const { composition, disabled } = props;\n\n  // Helper component that allows us to change the contentof the button when toggling the composition control in Storybook\n  const ButtonContent = ({ children }: { children: React.ReactNode }) => {\n    switch (composition) {\n      case Composition.Icon:\n        return <House />;\n      case Composition.TextIcon:\n        return (\n          <>\n            {children}\n            <House />\n          </>\n        );\n      case Composition.IconText:\n        return (\n          <>\n            <House />\n            {children}\n          </>\n        );\n      default:\n        return children;\n    }\n  };\n\n  const buttons = [\n    <Button key="button">\n      {/* @ts-expect-error care */}\n      <ButtonContent>Button</ButtonContent>\n    </Button>,\n    <Button key="link" href="#">\n      {/* @ts-expect-error care */}\n      <ButtonContent>Link</ButtonContent>\n    </Button>,\n  ];\n\n  return (\n    <>\n      <ButtonsDisplayer buttonProps={{ disabled }}>{buttons}</ButtonsDisplayer>\n\n      <div className="bg-green-dark py-4">\n        <ButtonsDisplayer buttonProps={{ color: \'light-green\', disabled }}>\n          {buttons}\n        </ButtonsDisplayer>\n      </div>\n\n      <div className="bg-blue py-4">\n        <ButtonsDisplayer buttonProps={{ color: \'white\', disabled }}>\n          {buttons}\n        </ButtonsDisplayer>\n      </div>\n    </>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"];try{Default.displayName="Default",Default.__docgenInfo={description:"",displayName:"Default",props:{composition:{defaultValue:null,description:"",name:"composition",required:!0,type:{name:"enum",value:[{value:'"Text"'},{value:'"Icon"'},{value:'"Text Icon"'},{value:'"Icon Text"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Button/stories/Button.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/Button/stories/Button.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}},"./src/Button/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>Button,A:()=>ButtonColorContext});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var react=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),clsx_m=__webpack_require__("../../node_modules/.pnpm/clsx@1.2.1/node_modules/clsx/dist/clsx.m.js"),jsx_runtime=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"),_excluded=["className","color","href","type","variant"];function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}var buttonVariations={"standard-primary":"bg-green border-green text-white","standard-secondary":"bg-white border-green text-black","light-green-primary":"bg-green-light border-green-light text-black","light-green-secondary":"bg-transparent border-green-light text-green-light","white-primary":"bg-white border-white text-black","white-secondary":"bg-transparent border-white text-white"},Button=(0,react.forwardRef)((function(props,ref){var className=props.className,colorFromProp=props.color,href=props.href,_props$type=props.type,type=void 0===_props$type?"button":_props$type,_props$variant=props.variant,variant=void 0===_props$variant?"primary":_props$variant,rest=_objectWithoutProperties(props,_excluded),colorFromContext=(0,react.useContext)(ButtonColorContext),buttonVariation=buttonVariations[(null!=colorFromProp?colorFromProp:colorFromContext)+"-"+variant],classes=(0,clsx_m.Z)(className,buttonVariation,"button");return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:href?(0,jsx_runtime.jsx)("a",Object.assign({},rest,{href,ref,className:classes})):(0,jsx_runtime.jsx)("button",Object.assign({},rest,{type,ref,className:classes}))})}));try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"enum",value:[{value:'"white"'},{value:'"standard"'},{value:'"light-green"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},href:{defaultValue:null,description:"",name:"href",required:!1,type:{name:"string"}},type:{defaultValue:{value:"button"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"submit"'},{value:'"reset"'}]}},variant:{defaultValue:{value:"primary"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"secondary"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}var ButtonColorContext=(0,react.createContext)("standard")}}]);