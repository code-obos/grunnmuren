'use client';
import{j as o,a as t}from"./jsx-runtime-289d1c53.js";import{r as p}from"./index-9a95590f.js";import{A as e}from"./TextField-dad6bcd8.js";import"./Alert-3ab1e1df.js";import"./ButtonColorContext-0c1af6d7.js";import"./index-d551b1cc.js";import"./clsx.m-388a5213.js";import"./icons-70ac2cb4.js";import"./index-3f94f77e.js";const H={title:"Accordion",parameters:{layout:"padded"}},i=()=>{const[u,l]=p.useState(!0);return o(e,{children:t(e.Item,{open:u,onChange:l,children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},n=()=>t(e,{children:[t(e.Item,{children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),t(e.Item,{defaultOpen:!0,children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})]});var r,a,c;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
}`,...(c=(a=i.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var d,s,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
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
}`,...(m=(s=n.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const O=["Controlled","Uncontrolled"];export{i as Controlled,n as Uncontrolled,O as __namedExportsOrder,H as default};
//# sourceMappingURL=Accordion.stories-067c2b20.js.map
