'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{T as r}from"./TextField-756d2657.js";import"./Alert-a62fd04a.js";import"./ButtonColorContext-3e1592d6.js";import"./index-f782f570.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-ce180944.js";const q={title:"TextField",parameters:{layout:"padded"}},a=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",required:!0}),e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",error:"Feltet er påkrevd",required:!0})]}),t=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Native validation enabled",required:!0}),e.jsx(r,{label:"Native validation disabled",required:!0,disableValidation:!0}),e.jsx("form",{onSubmit:m=>m.preventDefault(),noValidate:!0,children:e.jsx(r,{label:"noValidate attribute on the form element",required:!0})})]});var i,l,s;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
}`,...(o=(n=t.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const F=["Default","Validation"];export{a as Default,t as Validation,F as __namedExportsOrder,q as default};
//# sourceMappingURL=TextField.stories-266f5460.js.map
