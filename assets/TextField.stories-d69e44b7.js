'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{z as r}from"./TextField-83dd4dbb.js";import"./Alert-2387b44f.js";import"./ButtonColorContext-75fe5a6c.js";import"./index-f782f570.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-7ac97d86.js";import"./index-2c1fe7d2.js";const F={title:"TextField",parameters:{layout:"padded"}},a=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",required:!0}),e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",error:"Feltet er påkrevd",required:!0})]}),t=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Native validation enabled",required:!0}),e.jsx(r,{label:"Native validation disabled",required:!0,disableValidation:!0}),e.jsx("form",{onSubmit:m=>m.preventDefault(),noValidate:!0,children:e.jsx(r,{label:"noValidate attribute on the form element",required:!0})})]});var i,l,s;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <TextField label="Adresse" description="Eksempel: Drammensveien 1" required />

      <TextField label="Adresse" description="Eksempel: Drammensveien 1" error="Feltet er påkrevd" required />
    </div>;
}`,...(s=(l=a.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};var d,n,o;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <TextField label="Native validation enabled" required />
      <TextField label="Native validation disabled" required disableValidation />

      <form onSubmit={evt => evt.preventDefault()} noValidate>
        <TextField label="noValidate attribute on the form element" required />
      </form>
    </div>;
}`,...(o=(n=t.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const D=["Default","Validation"];export{a as Default,t as Validation,D as __namedExportsOrder,F as default};
//# sourceMappingURL=TextField.stories-d69e44b7.js.map
