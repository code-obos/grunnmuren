'use client';
import{j as r}from"./jsx-runtime-bb3e4369.js";import{h as c,i as M,j as q,k as v,l as G,m as R}from"./TextField-ab219d09.js";import"./Alert-2ec0f0bc.js";import"./ButtonColorContext-68c50e3b.js";import"./index-f782f570.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-5b68bf29.js";const A={title:"Forms",parameters:{layout:"padded"}},e=()=>r.jsxs("div",{className:"flex flex-col gap-4",children:[r.jsx(c,{children:"First name"}),r.jsx(c,{isRequired:!0,children:"First name"})]}),s=()=>r.jsx(M,{children:"The field is required"}),o=()=>r.jsx(q,{}),a=()=>r.jsx(v,{children:"Helper text"}),t=()=>r.jsx(G,{heading:"Form title",children:"This is a form container"}),m=()=>r.jsx(R,{});var n,i,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <FormLabel>First name</FormLabel>
      <FormLabel isRequired>First name</FormLabel>
    </div>;
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var d,l,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <FormErrorMessage>The field is required</FormErrorMessage>;
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var F,x,g;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  return <FormSuccess />;
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var h,f,j;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <FormHelperText>Helper text</FormHelperText>;
}`,...(j=(f=a.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var E,S,T;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  return <GmForm heading="Form title">This is a form container</GmForm>;
}`,...(T=(S=t.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var b,H,L;m.parameters={...m.parameters,docs:{...(b=m.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  return <GmFormError />;
}`,...(L=(H=m.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};const B=["Label","ErrorMessage","Success","HelperText","Form","FormError"];export{s as ErrorMessage,t as Form,m as FormError,a as HelperText,e as Label,o as Success,B as __namedExportsOrder,A as default};
//# sourceMappingURL=Form.stories-5b266851.js.map
