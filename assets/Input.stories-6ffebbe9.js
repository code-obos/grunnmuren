'use client';
import{a as c,j as e}from"./jsx-runtime-3f8eccd4.js";import{r as h,R as m}from"./index-8aa52469.js";import{I as l,h as u}from"./TextField-5c3734f1.js";import"./Alert-b0e5aef2.js";import"./ButtonColorContext-45de720f.js";import"./index-e234cb07.js";import{y as a}from"./icons-67de8d50.js";import"./clsx.m-388a5213.js";import"./index-2c1fe7d2.js";const N={title:"Input",parameters:{layout:"padded"}},r=()=>c("div",{className:"flex flex-col gap-4",children:[e(n,{label:"Plain",children:e(l,{})}),e(n,{label:"Placeholder",children:e(l,{placeholder:"Placeholder"})}),e(n,{label:"Prefix",children:e(l,{leftAddon:"kr"})}),e(n,{label:"Prefix icon",children:e(l,{leftAddon:e(a,{className:"text-green"})})}),e(n,{label:"Prefixed placeholder",children:e(l,{leftAddon:"kr",placeholder:"100 000"})}),e(n,{label:"Suffix icon",children:e(l,{rightAddon:e(a,{className:"text-green"})})}),e(n,{label:"Suffix and prefix icon",children:e(l,{rightAddon:e(a,{className:"text-green"}),leftAddon:e(a,{})})}),e(n,{label:"Size: (10)",children:e(l,{size:10})}),e(n,{label:"Invalid",children:e(l,{isInvalid:!0})})]}),n=s=>{const{label:p,children:f}=s,i=h.useId();return c("div",{children:[e(u,{className:"mb-2",htmlFor:i,children:p}),m.cloneElement(f,{id:i})]})};var t,d,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
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
}`,...(o=(d=r.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};const k=["Default"];export{r as Default,k as __namedExportsOrder,N as default};
//# sourceMappingURL=Input.stories-6ffebbe9.js.map
