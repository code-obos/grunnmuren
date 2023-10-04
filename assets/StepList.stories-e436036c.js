'use client';
import{j as e}from"./jsx-runtime-7f3d8b90.js";import{n as L,Y as S,V as f,f as g}from"./icons-e04922fb.js";import{S as r}from"./TextField-d2b64bd0.js";import"./Alert-d49095ed.js";import"./ButtonColorContext-ba32a896.js";import"./index-9353d67f.js";import"./index-68775723.js";import"./clsx-388a5213.js";const q={title:"StepList",parameters:{layout:"padded"},argTypes:{align:{defaultValue:"center",options:["center","top"],control:{type:"radio"}}}},s=n=>{const o=Array.from({length:4},(t,m)=>m+1);return e.jsx(r,{...n,children:o.map(t=>e.jsx(r.Item,{bullet:t+".",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},t))})},i=n=>{const o=[L,S,f,g];return e.jsx(r,{...n,children:o.map((t,m)=>e.jsx(r.Item,{bullet:e.jsx(t,{}),children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin metus felis, sed tincidunt mi tristique eu."},m))})};var p,a,c;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(props: StepListProps) => {
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
//# sourceMappingURL=StepList.stories-e436036c.js.map
