'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{r as f}from"./index-8aa52469.js";import{g as t}from"./TextField-b2c95aa0.js";import"./Alert-e406042e.js";import{B as h}from"./ButtonColorContext-940e0192.js";import"./index-f782f570.js";import"./clsx.m-388a5213.js";import"./icons-f590d0ca.js";import"./index-2c1fe7d2.js";const j={title:"Checkbox",parameters:{layout:"padded"}},r=()=>{const[a,c]=f.useState();return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t,{children:"Check me"}),e.jsx(t,{error:"Du må bekrefte for å fortsette",children:"Check me"}),e.jsxs("div",{children:[e.jsx("h2",{className:"h4",children:"with form"}),e.jsxs("form",{onSubmit:i=>{i.preventDefault(),c("Du må bekrefte for å fortsette")},children:[e.jsx(t,{error:a,children:"Check me"}),e.jsx(h,{type:"submit",children:"Submit"})]})]})]})};var o,s,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [error, setError] = useState<string>();
  return <div className="flex flex-col gap-4">
      <Checkbox>Check me</Checkbox>
      <Checkbox error="Du må bekrefte for å fortsette">Check me</Checkbox>

      <div>
        <h2 className="h4">with form</h2>
        <form onSubmit={e => {
        e.preventDefault();
        setError('Du må bekrefte for å fortsette');
      }}>
          <Checkbox error={error}>Check me</Checkbox>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>;
}`,...(m=(s=r.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const v=["Default"];export{r as Default,v as __namedExportsOrder,j as default};
//# sourceMappingURL=Checkbox.stories-9e5b176c.js.map
