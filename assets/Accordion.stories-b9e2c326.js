'use client';
import{j as o,a as t}from"./jsx-runtime-3f8eccd4.js";import{r as p}from"./index-8aa52469.js";import{A as e}from"./TextField-383cd1af.js";import"./Alert-59564f5a.js";import"./ButtonColorContext-c9775c95.js";import"./index-7b93734d.js";import"./clsx.m-388a5213.js";import"./icons-330a0f02.js";import"./index-2c1fe7d2.js";const H={title:"Accordion",parameters:{layout:"padded"}},i=()=>{const[u,l]=p.useState(!0);return o(e,{children:t(e.Item,{open:u,onChange:l,children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})})},n=()=>t(e,{children:[t(e.Item,{children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),t(e.Item,{defaultOpen:!0,children:[o(e.Header,{children:"Section title"}),o(e.Content,{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]})]});var r,a,c;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
//# sourceMappingURL=Accordion.stories-b9e2c326.js.map
