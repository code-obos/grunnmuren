'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{r as p,R as f}from"./index-8aa52469.js";import{I as l,h}from"./TextField-0dd652ff.js";import"./Alert-419e3d23.js";import"./ButtonColorContext-c4058776.js";import"./index-f782f570.js";import{y as r}from"./icons-0663131c.js";import"./clsx.m-388a5213.js";const A={title:"Input",parameters:{layout:"padded"}},a=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(n,{label:"Plain",children:e.jsx(l,{})}),e.jsx(n,{label:"Placeholder",children:e.jsx(l,{placeholder:"Placeholder"})}),e.jsx(n,{label:"Prefix",children:e.jsx(l,{leftAddon:"kr"})}),e.jsx(n,{label:"Prefix icon",children:e.jsx(l,{leftAddon:e.jsx(r,{className:"text-green"})})}),e.jsx(n,{label:"Prefixed placeholder",children:e.jsx(l,{leftAddon:"kr",placeholder:"100 000"})}),e.jsx(n,{label:"Suffix icon",children:e.jsx(l,{rightAddon:e.jsx(r,{className:"text-green"})})}),e.jsx(n,{label:"Suffix and prefix icon",children:e.jsx(l,{rightAddon:e.jsx(r,{className:"text-green"}),leftAddon:e.jsx(r,{})})}),e.jsx(n,{label:"Size: (10)",children:e.jsx(l,{size:10})}),e.jsx(n,{label:"Invalid",children:e.jsx(l,{isInvalid:!0})})]}),n=o=>{const{label:c,children:x}=o,i=p.useId();return e.jsxs("div",{children:[e.jsx(h,{className:"mb-2",htmlFor:i,children:c}),f.cloneElement(x,{id:i})]})};var s,t,d;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <Div label="Plain">
        <Input />
      </Div>

      <Div label="Placeholder">
        <Input placeholder="Placeholder" />
      </Div>

      <Div label="Prefix">
        <Input leftAddon="kr" />
      </Div>

      <Div label="Prefix icon">
        <Input leftAddon={<Search className="text-green" />} />
      </Div>

      <Div label="Prefixed placeholder">
        <Input leftAddon="kr" placeholder="100 000" />
      </Div>

      <Div label="Suffix icon">
        <Input rightAddon={<Search className="text-green" />} />
      </Div>

      <Div label="Suffix and prefix icon">
        <Input rightAddon={<Search className="text-green" />} leftAddon={<Search />} />
      </Div>

      <Div label="Size: (10)">
        <Input size={10} />
      </Div>

      <Div label="Invalid">
        <Input isInvalid />
      </Div>
    </div>;
}`,...(d=(t=a.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};const P=["Default"];export{a as Default,P as __namedExportsOrder,A as default};
//# sourceMappingURL=Input.stories-166028a5.js.map
