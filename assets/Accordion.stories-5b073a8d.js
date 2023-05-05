'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{r as l}from"./index-8aa52469.js";import{A as o}from"./TextField-83dd4dbb.js";import"./Alert-2387b44f.js";import"./ButtonColorContext-75fe5a6c.js";import"./index-f782f570.js";import"./clsx.m-388a5213.js";import"./icons-7ac97d86.js";import"./index-2c1fe7d2.js";const I={title:"Accordion",parameters:{layout:"padded"}},i=()=>{const[m,u]=l.useState(!0);return e.jsx(o,{children:e.jsxs(o.Item,{open:m,onChange:u,children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},n=()=>e.jsxs(o,{children:[e.jsxs(o.Item,{children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(o.Item,{defaultOpen:!0,children:[e.jsx(o.Header,{children:"Section title"}),e.jsx(o.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})]});var t,r,c;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:`() => {
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
}`,...(s=(d=n.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};const S=["Controlled","Uncontrolled"];export{i as Controlled,n as Uncontrolled,S as __namedExportsOrder,I as default};
//# sourceMappingURL=Accordion.stories-5b073a8d.js.map
