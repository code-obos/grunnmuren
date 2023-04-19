'use client';
import{j as r,a as s}from"./jsx-runtime-289d1c53.js";import{b as i,c as n,d as y,e as k,f as L}from"./TextField-757c3524.js";import"./Alert-d71c7b8a.js";import"./ButtonColorContext-939c9d97.js";import"./index-d551b1cc.js";import"./index-9a95590f.js";import"./clsx.m-388a5213.js";import"./icons-c8f1c288.js";import"./index-3f94f77e.js";const S={title:"Card",parameters:{layout:"padded"},argTypes:{bgColor:{options:["white","gray"],control:{type:"radio"}}}},e=t=>r(i,{...t,children:s(n,{children:[r("h3",{children:"Title"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper dignissim enim quis suscipit."]})});e.args={bgColor:"white"};const a=t=>r(i,{...t,children:s(n,{children:[r(y,{href:"#",children:r("h3",{children:"Title"})}),"The whole card is clickable link, but only the heading gets underlined on hover."]})});a.args={bgColor:"white"};const o=()=>s(k,{bgColor:"gray",children:[r(d,{}),r(d,{})]});o.parameters={layout:"none"};const d=()=>s(i,{children:[r(L,{src:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_500/f_auto,q_auto/v1578381770/Hammersborg%20Inkasso/2018_Medlem_06",width:500,height:333}),s(n,{children:[r("h3",{className:"mb-4",children:r(y,{href:"#",children:"Gode råd om økonomi"})}),"Se våre forbrukerråd!"]})]});var l,c,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(props: CardProps<'div'>) => {
  return <Card {...props}>
      <CardContent>
        <h3>Title</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        ullamcorper dignissim enim quis suscipit.
      </CardContent>
    </Card>;
}`,...(p=(c=e.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`(props: CardProps<'div'>) => {
  return <Card {...props}>
      <CardContent>
        <CardLinkOverlay href="#">
          <h3>Title</h3>
        </CardLinkOverlay>
        The whole card is clickable link, but only the heading gets underlined
        on hover.
      </CardContent>
    </Card>;
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var C,g,b;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  return <GCardList bgColor="gray">
      <CardExample />
      <CardExample />
    </GCardList>;
}`,...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};const j=["Default","Link","CardList"];export{o as CardList,e as Default,a as Link,j as __namedExportsOrder,S as default};
//# sourceMappingURL=Card.stories-67cbbe2f.js.map
