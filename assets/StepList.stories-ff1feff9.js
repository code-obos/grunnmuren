'use client';
import{j as e}from"./jsx-runtime-289d1c53.js";import{J as L,R as S,e as f,h as g}from"./icons-c8f1c288.js";import{y as r}from"./TextField-757c3524.js";import"./Alert-d71c7b8a.js";import"./ButtonColorContext-939c9d97.js";import"./index-d551b1cc.js";import"./index-9a95590f.js";import"./clsx.m-388a5213.js";import"./index-3f94f77e.js";const j={title:"StepList",parameters:{layout:"padded"},argTypes:{align:{defaultValue:"center",options:["center","top"],control:{type:"radio"}}}},i=o=>{const m=Array.from({length:4},(t,n)=>n+1);return e(r,{...o,children:m.map(t=>e(r.Item,{bullet:t+".",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},t))})},s=o=>e(r,{...o,children:[L,S,f,g].map((t,n)=>e(r.Item,{bullet:e(t,{}),children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},n))});var p,a,c;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(props: StepListProps) => {
  const numbers = Array.from({
    length: 4
  }, (v, k) => k + 1);
  return <StepList {...props}>
      {numbers.map(n => <StepList.Item key={n} bullet={n + '.'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(c=(a=i.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var u,l,d;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`(props: StepListProps) => {
  const icons = [Documents, Parking, File, House];
  return <StepList {...props}>
      {icons.map((Icon, i) => <StepList.Item key={i} bullet={<Icon />}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          sollicitudin metus felis, sed tincidunt mi tristique eu.
        </StepList.Item>)}
    </StepList>;
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const v=["Numbered","Icons"];export{s as Icons,i as Numbered,v as __namedExportsOrder,j as default};
//# sourceMappingURL=StepList.stories-ff1feff9.js.map
