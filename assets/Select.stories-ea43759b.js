'use client';
import{a as n,j as r}from"./jsx-runtime-3f8eccd4.js";import{S as s}from"./TextField-b8e49549.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-67de8d50.js";import"./index-2c1fe7d2.js";import"./Alert-b0e5aef2.js";import"./ButtonColorContext-b18e367d.js";import"./index-7b93734d.js";const S={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},i=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>n(s,{...p,label:"Velg område",children:[r("option",{value:"",children:"Velg område"}),i.map(o=>r("option",{value:o.key,children:o.value},o.key))]});var t,a,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const V=["Default"];export{e as Default,V as __namedExportsOrder,S as default};
//# sourceMappingURL=Select.stories-ea43759b.js.map
