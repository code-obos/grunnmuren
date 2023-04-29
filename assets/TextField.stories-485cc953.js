'use client';
import{a as m,j as e}from"./jsx-runtime-3f8eccd4.js";import{z as r}from"./TextField-a9985555.js";import"./Alert-7e800b75.js";import"./ButtonColorContext-43439657.js";import"./index-7b93734d.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-63fe3a1d.js";import"./index-2c1fe7d2.js";const N={title:"TextField",parameters:{layout:"padded"}},a=()=>m("div",{className:"flex flex-col gap-4",children:[e(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",required:!0}),e(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",error:"Feltet er påkrevd",required:!0})]}),t=()=>m("div",{className:"flex flex-col gap-4",children:[e(r,{label:"Native validation enabled",required:!0}),e(r,{label:"Native validation disabled",required:!0,disableValidation:!0}),e("form",{onSubmit:p=>p.preventDefault(),noValidate:!0,children:e(r,{label:"noValidate attribute on the form element",required:!0})})]});var i,l,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <TextField label="Adresse" description="Eksempel: Drammensveien 1" required />

      <TextField label="Adresse" description="Eksempel: Drammensveien 1" error="Feltet er påkrevd" required />
    </div>;
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var n,o,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <TextField label="Native validation enabled" required />
      <TextField label="Native validation disabled" required disableValidation />

      <form onSubmit={evt => evt.preventDefault()} noValidate>
        <TextField label="noValidate attribute on the form element" required />
      </form>
    </div>;
}`,...(s=(o=t.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const V=["Default","Validation"];export{a as Default,t as Validation,V as __namedExportsOrder,N as default};
//# sourceMappingURL=TextField.stories-485cc953.js.map
