'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{T as r}from"./TextField-17e3731e.js";import"./Alert-dd7e8846.js";import"./ButtonColorContext-be54bbe0.js";import"./index-d4844545.js";import"./index-4b4b5343.js";import"./clsx-388a5213.js";import"./icons-5978f042.js";const q={title:"TextField",parameters:{layout:"padded"}},a=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",required:!0}),e.jsx(r,{label:"Adresse",description:"Eksempel: Drammensveien 1",error:"Feltet er påkrevd",required:!0})]}),t=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(r,{label:"Native validation enabled",required:!0}),e.jsx(r,{label:"Native validation disabled",required:!0,disableValidation:!0}),e.jsx("form",{onSubmit:m=>m.preventDefault(),noValidate:!0,children:e.jsx(r,{label:"noValidate attribute on the form element",required:!0})})]});var i,l,s;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`() => {
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
//# sourceMappingURL=TextField.stories-c2d469be.js.map