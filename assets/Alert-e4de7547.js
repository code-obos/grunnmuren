'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{c as t}from"./clsx.m-388a5213.js";import{a as m,H as d}from"./icons-d04e9827.js";const l=r=>{const{className:a,children:i,heading:n,severity:s="alert",...c}=r;return e.jsx("section",{className:t(a,"p-4 md:py-8",{"bg-orange-light":s==="info","bg-red-light":s==="alert"}),role:"alert",...c,children:e.jsxs("div",{className:"flex justify-center",children:[e.jsx(o,{className:"mr-4 flex-none md:mr-8 md:text-2xl",severity:s}),e.jsxs("div",{className:"w-prose flex-initial",children:[e.jsx("h2",{className:"h4 mb-2",children:n}),i]})]})})},o=({severity:r,className:a})=>r==="alert"?e.jsx(m,{className:t(a,"text-red")}):e.jsx(d,{className:t(a,"text-orange")});try{l.displayName="Alert",l.__docgenInfo={description:"",displayName:"Alert",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},heading:{defaultValue:null,description:"",name:"heading",required:!0,type:{name:"string"}},severity:{defaultValue:{value:"alert"},description:"",name:"severity",required:!1,type:{name:"enum",value:[{value:'"alert"'},{value:'"info"'}]}}}}}catch{}export{l as A};
//# sourceMappingURL=Alert-e4de7547.js.map
