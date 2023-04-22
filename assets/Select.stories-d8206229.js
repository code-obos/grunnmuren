'use client';
import{a as n,j as r}from"./jsx-runtime-289d1c53.js";import{S as s}from"./TextField-dad6bcd8.js";import"./index-9a95590f.js";import"./clsx.m-388a5213.js";import"./icons-70ac2cb4.js";import"./index-3f94f77e.js";import"./Alert-3ab1e1df.js";import"./ButtonColorContext-0c1af6d7.js";import"./index-d551b1cc.js";const S={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},i=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>n(s,{...p,label:"Velg område",children:[r("option",{value:"",children:"Velg område"}),i.map(o=>r("option",{value:o.key,children:o.value},o.key))]});var t,a,l;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(l=(a=e.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const V=["Default"];export{e as Default,V as __namedExportsOrder,S as default};
//# sourceMappingURL=Select.stories-d8206229.js.map
