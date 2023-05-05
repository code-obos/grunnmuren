'use client';
import{j as t}from"./jsx-runtime-bb3e4369.js";import{S as n}from"./TextField-83dd4dbb.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-7ac97d86.js";import"./index-2c1fe7d2.js";import"./Alert-2387b44f.js";import"./ButtonColorContext-75fe5a6c.js";import"./index-f782f570.js";const f={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},s=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>t.jsxs(n,{...p,label:"Velg område",children:[t.jsx("option",{value:"",children:"Velg område"}),s.map(o=>t.jsx("option",{value:o.key,children:o.value},o.key))]});var r,l,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,f as default};
//# sourceMappingURL=Select.stories-72a08122.js.map
