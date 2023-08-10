'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{J as L,R as S,e as f,h as g}from"./icons-1e1e4f63.js";import{E as r}from"./TextField-09c7bfea.js";import"./Alert-f8cc820b.js";import"./ButtonColorContext-2aa110c1.js";import"./index-c4d93cf4.js";import"./index-4b4b5343.js";import"./clsx.m-388a5213.js";const q={title:"StepList",parameters:{layout:"padded"},argTypes:{align:{defaultValue:"center",options:["center","top"],control:{type:"radio"}}}},s=o=>{const n=Array.from({length:4},(t,m)=>m+1);return e.jsx(r,{...o,children:n.map(t=>e.jsx(r.Item,{bullet:t+".",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},t))})},i=o=>{const n=[L,S,f,g];return e.jsx(r,{...o,children:n.map((t,m)=>e.jsx(r.Item,{bullet:e.jsx(t,{}),children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},m))})};var p,a,c;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(props: StepListProps) => {
  const numbers = Array.from({
    length: 4
  }, (v, k) => k + 1);
  return <StepList {...props}>
      {numbers.map(n => <StepList.Item key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(c=(a=s.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var u,l,d;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`(props: StepListProps) => {
  const icons = [Documents, Parking, File, House];
  return <StepList {...props}>
      {icons.map((Icon, i) => <StepList.Item key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(d=(l=i.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const P=["Numbered","Icons"];export{i as Icons,s as Numbered,P as __namedExportsOrder,q as default};
//# sourceMappingURL=StepList.stories-e52a4e50.js.map