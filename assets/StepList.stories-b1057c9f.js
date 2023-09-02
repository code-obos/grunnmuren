'use client';
import{j as e}from"./jsx-runtime-7c577f00.js";import{q as L,b as S,C as b,a as f}from"./icons-4cb021b6.js";import{S as r}from"./TextField-2c90c83d.js";import"./Alert-b978ba16.js";import"./ButtonColorContext-7ebb287b.js";import"./index-e979ca2b.js";import"./index-56a930d9.js";import"./clsx-388a5213.js";const q={title:"StepList",parameters:{layout:"padded"},argTypes:{align:{defaultValue:"center",options:["center","top"],control:{type:"radio"}}}},s=o=>{const n=Array.from({length:4},(t,m)=>m+1);return e.jsx(r,{...o,children:n.map(t=>e.jsx(r.Item,{bullet:t+".",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},t))})},i=o=>{const n=[L,S,b,f];return e.jsx(r,{...o,children:n.map((t,m)=>e.jsx(r.Item,{bullet:e.jsx(t,{}),children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},m))})};var a,p,c;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`(props: StepListProps) => {
  const numbers = Array.from({
    length: 4
  }, (v, k) => k + 1);
  return <StepList {...props}>
      {numbers.map(n => <StepList.Item key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(c=(p=s.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,l,d;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`(props: StepListProps) => {
  const icons = [Documents, Parking, File, House];
  return <StepList {...props}>
      {icons.map((Icon, i) => <StepList.Item key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(d=(l=i.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const P=["Numbered","Icons"];export{i as Icons,s as Numbered,P as __namedExportsOrder,q as default};
//# sourceMappingURL=StepList.stories-b1057c9f.js.map
