'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{r as f}from"./index-4b4b5343.js";import{g as t}from"./TextField-f2c7fbdf.js";import"./Alert-18a1b915.js";import{B as h}from"./ButtonColorContext-5d8c18df.js";import"./index-d4844545.js";import"./clsx-388a5213.js";import"./icons-83dcd547.js";const C={title:"Checkbox",parameters:{layout:"padded"}},r=()=>{const[a,c]=f.useState();return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(t,{children:"Check me"}),e.jsx(t,{error:"Du må bekrefte for å fortsette",children:"Check me"}),e.jsxs("div",{children:[e.jsx("h2",{className:"h4",children:"with form"}),e.jsxs("form",{onSubmit:i=>{i.preventDefault(),c("Du må bekrefte for å fortsette")},children:[e.jsx(t,{error:a,children:"Check me"}),e.jsx(h,{type:"submit",children:"Submit"})]})]})]})};var o,s,m;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
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
}`,...(m=(s=r.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const j=["Default"];export{r as Default,j as __namedExportsOrder,C as default};
//# sourceMappingURL=Checkbox.stories-8d45df8d.js.map
