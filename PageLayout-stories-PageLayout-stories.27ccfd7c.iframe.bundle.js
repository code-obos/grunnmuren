"use strict";(self.webpackChunk_obosbbl_grunnmuren_react=self.webpackChunk_obosbbl_grunnmuren_react||[]).push([[698,841,305,294],{"./src/Footer/stories/Footer.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Footer/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Footer"};var Default=function Default(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.$,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div",{children:["I am mostly empty footer. ",(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a",{href:"#",children:"This link leads no where."})]})})};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'() => {\n  return (\n    <Footer>\n      <div>\n        I am mostly empty footer. <a href="#">This link leads no where.</a>\n      </div>\n    </Footer>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]},"./src/Hero/stories/Hero.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{WithImage:()=>WithImage,WithoutImage:()=>WithoutImage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var ___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Hero",argTypes:{contentPosition:{options:["below-center","below-left","top-left","bottom-left","top-right","bottom-right","center","vertical-split"],control:{type:"select"}},bgColor:{options:["white","blue","green"],control:{type:"select"}}}};var description="Se hva vi selger der du vil bo og finn drømmeboligen til fastpris. Du kan forhåndsbestille visning eller kontakte prosjektselgerne – påmeldingsskjema og kontaktinformasjon finner du på hvert enkelt boligprosjekt.",image={src:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_600,h_700/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",mdSrc:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_1280/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",alt:"To personer finner svar på spørsmål via kundeservicesidene"},WithImage=function WithImage(props){var heroImage=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.ZG,Object.assign({},image));return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.VM,Object.assign({image:heroImage},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.JN,{heading:"Velkommen til visning",description,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.DO,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{children:"Primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{variant:"secondary",children:"Secondary"})]})})}))};WithImage.displayName="WithImage",WithImage.args={contentPosition:"below-center",bgColor:"white"};var WithoutImage=function WithoutImage(props){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.VM,Object.assign({},props,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.JN,{heading:"Velkommen til visning",description,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.DO,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{children:"Primary"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.zx,{variant:"secondary",children:"Secondary"})]})})}))};WithoutImage.displayName="WithoutImage",WithoutImage.args={contentPosition:"below-center",bgColor:"white"},WithImage.parameters=Object.assign({storySource:{source:'function WithImage(props: HeroProps) {\n  const heroImage = <HeroImage {...image} />;\n\n  return (\n    <Hero image={heroImage} {...props}>\n      <HeroContent heading={heading} description={description}>\n        <HeroActions>\n          <Button>Primary</Button>\n          <Button variant="secondary">Secondary</Button>\n        </HeroActions>\n      </HeroContent>\n    </Hero>\n  );\n}'}},WithImage.parameters),WithoutImage.parameters=Object.assign({storySource:{source:'function WithoutImage(props: HeroProps) {\n  return (\n    <Hero {...props}>\n      <HeroContent heading={heading} description={description}>\n        <HeroActions>\n          <Button>Primary</Button>\n          <Button variant="secondary">Secondary</Button>\n        </HeroActions>\n      </HeroContent>\n    </Hero>\n  );\n}'}},WithoutImage.parameters);var __namedExportsOrder=["WithImage","WithoutImage"];try{WithImage.displayName="WithImage",WithImage.__docgenInfo={description:"",displayName:"WithImage",props:{bgColor:{defaultValue:{value:"white"},description:"",name:"bgColor",required:!1,type:{name:"enum",value:[{value:'"white"'},{value:'"green"'},{value:'"blue"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},contentPosition:{defaultValue:{value:"below-center"},description:"Positioning of the content relative to the image. Only affects wider screens",name:"contentPosition",required:!1,type:{name:"enum",value:[{value:'"below-center"'},{value:'"below-left"'},{value:'"top-left"'},{value:'"bottom-left"'},{value:'"top-right"'},{value:'"bottom-right"'},{value:'"center"'},{value:'"vertical-split"'}]}},image:{defaultValue:null,description:"Instance of HeroImage",name:"image",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Hero/stories/Hero.stories.tsx#WithImage"]={docgenInfo:WithImage.__docgenInfo,name:"WithImage",path:"src/Hero/stories/Hero.stories.tsx#WithImage"})}catch(__react_docgen_typescript_loader_error){}try{WithoutImage.displayName="WithoutImage",WithoutImage.__docgenInfo={description:"",displayName:"WithoutImage",props:{bgColor:{defaultValue:{value:"white"},description:"",name:"bgColor",required:!1,type:{name:"enum",value:[{value:'"white"'},{value:'"green"'},{value:'"blue"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},contentPosition:{defaultValue:{value:"below-center"},description:"Positioning of the content relative to the image. Only affects wider screens",name:"contentPosition",required:!1,type:{name:"enum",value:[{value:'"below-center"'},{value:'"below-left"'},{value:'"top-left"'},{value:'"bottom-left"'},{value:'"top-right"'},{value:'"bottom-right"'},{value:'"center"'},{value:'"vertical-split"'}]}},image:{defaultValue:null,description:"Instance of HeroImage",name:"image",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Hero/stories/Hero.stories.tsx#WithoutImage"]={docgenInfo:WithoutImage.__docgenInfo,name:"WithoutImage",path:"src/Hero/stories/Hero.stories.tsx#WithoutImage"})}catch(__react_docgen_typescript_loader_error){}},"./src/Navbar/stories/Navbar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.map.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.symbol.iterator.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.function.name.js"),__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.array.from.js");var react__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("./src/index.ts"),___WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("./src/Navbar/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null==_i)return;var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Navbar"};var navItems=["Forsiden","Ny bolig","Brukt bolig","Medlem","Bank","Forsikring","Samfunnsansvar","Dette er OBOS"],BliMedlemButton=function BliMedlemButton(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(___WEBPACK_IMPORTED_MODULE_14__.zx,{variant:"secondary",children:"Bli medlem"})};BliMedlemButton.displayName="BliMedlemButton";var Default=function Default(){var _useState2=_slicedToArray((0,react__WEBPACK_IMPORTED_MODULE_13__.useState)(),2),activeIndex=_useState2[0],setActiveIndex=_useState2[1];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(___WEBPACK_IMPORTED_MODULE_15__.wp,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(___WEBPACK_IMPORTED_MODULE_15__.ur,{logo:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("a",{href:"#","aria-label":"Til startsiden for OBOS",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("img",{className:"<md:w-[100px]",src:"/obos_liggende_hus_hvit.svg",width:"173",height:"41"})}),children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(BliMedlemButton,{})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)(___WEBPACK_IMPORTED_MODULE_15__.$D,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(___WEBPACK_IMPORTED_MODULE_15__.Ok,{children:navItems.map((function(item,index){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(___WEBPACK_IMPORTED_MODULE_15__.e9,{active:index===activeIndex,onClick:function onClick(e){return function handleClick(event,itemIndex){event.preventDefault(),setActiveIndex(itemIndex)}(e,index)},href:"#",children:item},index)}))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(___WEBPACK_IMPORTED_MODULE_15__.nP,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(BliMedlemButton,{})})]})]})};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'() => {\n  const [activeIndex, setActiveIndex] = useState<number>();\n\n  const handleClick = (event: React.MouseEvent, itemIndex: number) => {\n    event.preventDefault();\n    setActiveIndex(itemIndex);\n  };\n\n  return (\n    <Navbar>\n      <NavbarContent\n        logo={\n          <a href="#" aria-label="Til startsiden for OBOS">\n            <img\n              className="<md:w-[100px]"\n              src="/obos_liggende_hus_hvit.svg"\n              width="173"\n              height="41"\n            />\n          </a>\n        }\n      >\n        <BliMedlemButton />\n      </NavbarContent>\n      <NavbarCollapsible>\n        <NavbarItems>\n          {navItems.map((item, index) => (\n            <NavbarItem\n              active={index === activeIndex}\n              key={index}\n              onClick={(e) => handleClick(e, index)}\n              href="#"\n            >\n              {item}\n            </NavbarItem>\n          ))}\n        </NavbarItems>\n        <NavbarExpandedMobileContent>\n          <BliMedlemButton />\n        </NavbarExpandedMobileContent>\n      </NavbarCollapsible>\n    </Navbar>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]},"./src/PageLayout/stories/PageLayout.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("../../node_modules/.pnpm/core-js@3.22.5/node_modules/core-js/modules/es.object.assign.js");var _Navbar_stories_Navbar_stories__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Navbar/stories/Navbar.stories.tsx"),_Hero_stories_Hero_stories__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/Hero/stories/Hero.stories.tsx"),_Footer_stories_Footer_stories__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/Footer/stories/Footer.stories.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Pagelayout"};var Default=function Default(){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{className:"page-layout",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Navbar_stories_Navbar_stories__WEBPACK_IMPORTED_MODULE_1__.Default,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("main",{className:"page-layout-main",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Hero_stories_Hero_stories__WEBPACK_IMPORTED_MODULE_2__.WithImage,Object.assign({},_Hero_stories_Hero_stories__WEBPACK_IMPORTED_MODULE_2__.WithImage.args)),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div",{className:"prose container-prose",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_Footer_stories_Footer_stories__WEBPACK_IMPORTED_MODULE_3__.Default,{})]})};Default.displayName="Default",Default.parameters=Object.assign({storySource:{source:'() => {\n  return (\n    <div className="page-layout">\n      <Navbar />\n      <main className="page-layout-main">\n        <div>\n          {/* @ts-expect-error we don\'t want to provide children as we reuse a story */}\n          <Hero {...Hero.args} />\n          <div className="prose container-prose">\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do\n            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim\n            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut\n            aliquip ex ea commodo consequat. Duis aute irure dolor in\n            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in\n            culpa qui officia deserunt mollit anim id est laborum.\n          </div>\n        </div>\n      </main>\n      <Footer />\n    </div>\n  );\n}'}},Default.parameters);var __namedExportsOrder=["Default"]}}]);