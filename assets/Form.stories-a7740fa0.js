'use client';
import{a as j,j as r}from"./jsx-runtime-3f8eccd4.js";import{h as c,i as q,j as v,k as G,l as N,m as R}from"./TextField-b8f8b114.js";import"./Alert-6e526d2b.js";import"./ButtonColorContext-25920443.js";import"./index-7b93734d.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-80e5b504.js";import"./index-2c1fe7d2.js";const C={title:"Forms",parameters:{layout:"padded"}},e=()=>j("div",{className:"flex flex-col gap-4",children:[r(c,{children:"First name"}),r(c,{isRequired:!0,children:"First name"})]}),s=()=>r(q,{children:"The field is required"}),o=()=>r(v,{}),a=()=>r(G,{children:"Helper text"}),t=()=>r(N,{heading:"Form title",children:"This is a form container"}),m=()=>r(R,{});var n,i,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <FormLabel>First name</FormLabel>
      <FormLabel isRequired>First name</FormLabel>
    </div>;
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var d,l,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <FormErrorMessage>The field is required</FormErrorMessage>;
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var F,g,x;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
  return <FormSuccess />;
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,f,E;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <FormHelperText>Helper text</FormHelperText>;
}`,...(E=(f=a.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var S,T,b;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  return <GmForm heading="Form title">This is a form container</GmForm>;
}`,...(b=(T=t.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var H,L,M;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  return <GmFormError />;
}`,...(M=(L=m.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};const D=["Label","ErrorMessage","Success","HelperText","Form","FormError"];export{s as ErrorMessage,t as Form,m as FormError,a as HelperText,e as Label,o as Success,D as __namedExportsOrder,C as default};
//# sourceMappingURL=Form.stories-a7740fa0.js.map
