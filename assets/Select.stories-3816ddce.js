'use client';
import{j as t}from"./jsx-runtime-7c577f00.js";import{d as n}from"./TextField-8b47dece.js";import"./index-56a930d9.js";import"./clsx-388a5213.js";import"./icons-8ae98ee6.js";import"./Alert-752a8594.js";import"./ButtonColorContext-881d855c.js";import"./index-e979ca2b.js";const k={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},s=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>t.jsxs(n,{...p,label:"Velg område",children:[t.jsx("option",{value:"",children:"Velg område"}),s.map(o=>t.jsx("option",{value:o.key,children:o.value},o.key))]});var r,l,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,k as default};
//# sourceMappingURL=Select.stories-3816ddce.js.map
