'use client';
import{j as t}from"./jsx-runtime-bb3e4369.js";import{S as n}from"./TextField-1ee854b7.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-931ccc71.js";import"./Alert-a0b1060c.js";import"./ButtonColorContext-23de2b54.js";import"./index-f782f570.js";const k={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},s=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>t.jsxs(n,{...p,label:"Velg område",children:[t.jsx("option",{value:"",children:"Velg område"}),s.map(o=>t.jsx("option",{value:o.key,children:o.value},o.key))]});var r,l,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,k as default};
//# sourceMappingURL=Select.stories-4d712def.js.map
