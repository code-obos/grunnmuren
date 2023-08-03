'use client';
import{j as r}from"./jsx-runtime-bb3e4369.js";import{b as t,c as i,d as x,e as j,f as b}from"./TextField-f14b3f98.js";import"./Alert-ffc6c808.js";import"./ButtonColorContext-abc05f6c.js";import"./index-f782f570.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-3a634e45.js";const q={title:"Card",parameters:{layout:"padded"},argTypes:{bgColor:{options:["white","gray"],control:{type:"radio"}}}},e=o=>r.jsx(t,{...o,children:r.jsxs(i,{children:[r.jsx("h3",{children:"Title"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper dignissim enim quis suscipit."]})});e.args={bgColor:"white"};const s=o=>r.jsx(t,{...o,children:r.jsxs(i,{children:[r.jsx(x,{href:"#",children:r.jsx("h3",{children:"Title"})}),"The whole card is clickable link, but only the heading gets underlined on hover."]})});s.args={bgColor:"white"};const a=()=>r.jsxs(j,{bgColor:"gray",children:[r.jsx(n,{}),r.jsx(n,{})]});a.parameters={layout:"none"};const n=()=>r.jsxs(t,{children:[r.jsx(b,{src:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/w_500/f_auto,q_auto/v1578381770/Hammersborg%20Inkasso/2018_Medlem_06",width:500,height:333}),r.jsxs(i,{children:[r.jsx("h3",{className:"mb-4",children:r.jsx(x,{href:"#",children:"Gode råd om økonomi"})}),"Se våre forbrukerråd!"]})]});var d,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`(props: CardProps<'div'>) => {
  return <Card {...props}>
      <CardContent>
        <h3>Title</h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        ullamcorper dignissim enim quis suscipit.
      </CardContent>
    </Card>;
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var p,m,u;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(props: CardProps<'div'>) => {
  return <Card {...props}>
      <CardContent>
        <CardLinkOverlay href="#">
          <h3>Title</h3>
        </CardLinkOverlay>
        The whole card is clickable link, but only the heading gets underlined
        on hover.
      </CardContent>
    </Card>;
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,C,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <GCardList bgColor="gray">
      <CardExample />
      <CardExample />
    </GCardList>;
}`,...(g=(C=a.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const E=["Default","Link","CardList"];export{a as CardList,e as Default,s as Link,E as __namedExportsOrder,q as default};
//# sourceMappingURL=Card.stories-bf9ff230.js.map
