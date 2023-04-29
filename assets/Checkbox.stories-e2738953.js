'use client';
import{a as t,j as e}from"./jsx-runtime-3f8eccd4.js";import{r as h}from"./index-8aa52469.js";import{g as o}from"./TextField-b8e49549.js";import"./Alert-b0e5aef2.js";import{B as l}from"./ButtonColorContext-b18e367d.js";import"./index-7b93734d.js";import"./clsx.m-388a5213.js";import"./icons-67de8d50.js";import"./index-2c1fe7d2.js";const D={title:"Checkbox",parameters:{layout:"padded"}},r=()=>{const[c,i]=h.useState();return t("div",{className:"flex flex-col gap-4",children:[e(o,{children:"Check me"}),e(o,{error:"Du må bekrefte for å fortsette",children:"Check me"}),t("div",{children:[e("h2",{className:"h4",children:"with form"}),t("form",{onSubmit:f=>{f.preventDefault(),i("Du må bekrefte for å fortsette")},children:[e(o,{error:c,children:"Check me"}),e(l,{type:"submit",children:"Submit"})]})]})]})};var s,m,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(a=(m=r.parameters)==null?void 0:m.docs)==null?void 0:a.source}}};const S=["Default"];export{r as Default,S as __namedExportsOrder,D as default};
//# sourceMappingURL=Checkbox.stories-e2738953.js.map
