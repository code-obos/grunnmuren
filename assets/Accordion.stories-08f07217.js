'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{r as l}from"./index-4b4b5343.js";import{A as o}from"./TextField-09c7bfea.js";import"./Alert-f8cc820b.js";import"./ButtonColorContext-2aa110c1.js";import"./index-c4d93cf4.js";import"./clsx.m-388a5213.js";import"./icons-1e1e4f63.js";const b={title:"Accordion",parameters:{layout:"padded"}},i=()=>{const[m,u]=l.useState(!0);return e.jsx(o,{children:e.jsxs(o.Item,{open:m,onChange:u,children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},n=()=>e.jsxs(o,{children:[e.jsxs(o.Item,{children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(o.Item,{defaultOpen:!0,children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})]});var t,r,c;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
  const [isOpen, setIsOpen] = useState(true);
  return <Accordion>
      <Accordion.Item open={isOpen} onChange={setIsOpen}>
        <Accordion.Header>Section title</Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>;
}`,...(c=(r=i.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};var a,d,s;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  return <Accordion>
      <Accordion.Item>
        <Accordion.Header>Section title</Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item defaultOpen>
        <Accordion.Header>Section title</Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>;
}`,...(s=(d=n.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};const I=["Controlled","Uncontrolled"];export{i as Controlled,n as Uncontrolled,I as __namedExportsOrder,b as default};
//# sourceMappingURL=Accordion.stories-08f07217.js.map