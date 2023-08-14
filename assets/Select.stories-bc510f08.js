'use client';
import{j as t}from"./jsx-runtime-50dc7401.js";import{S as n}from"./TextField-d78dd594.js";import"./index-4b4b5343.js";import"./clsx-388a5213.js";import"./icons-7c154306.js";import"./Alert-1d4a5a9e.js";import"./ButtonColorContext-d7c50ea3.js";import"./index-d4844545.js";const k={title:"Select",parameters:{layout:"padded"},argTypes:{description:{defaultValue:"Så vi kan hjelpe deg bedre",control:"text"},size:{defaultValue:"medium",options:["medium","small"],control:{type:"radio"}},required:{defaultValue:!0,control:"boolean"}}},s=[{key:"alle",value:"Alle"},{key:"oslo",value:"Oslo"},{key:"agder",value:"Agder"},{key:"trondelag",value:"Trøndelag"},{key:"tromso",value:"Tromsø"}],e=p=>t.jsxs(n,{...p,label:"Velg område",children:[t.jsx("option",{value:"",children:"Velg område"}),s.map(o=>t.jsx("option",{value:o.key,children:o.value},o.key))]});var r,l,a;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`(props: SelectProps) => {
  return <Select {...props} label="Velg område">
      <option value="">Velg område</option>
      {options.map(option => <option key={option.key} value={option.key}>
          {option.value}
        </option>)}
    </Select>;
}`,...(a=(l=e.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};const f=["Default"];export{e as Default,f as __namedExportsOrder,k as default};
//# sourceMappingURL=Select.stories-bc510f08.js.map
