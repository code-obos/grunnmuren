'use client';
import{a as t,j as e}from"./jsx-runtime-289d1c53.js";import{r as h}from"./index-9a95590f.js";import{g as o}from"./TextField-757c3524.js";import"./Alert-d71c7b8a.js";import{B as l}from"./ButtonColorContext-939c9d97.js";import"./index-d551b1cc.js";import"./clsx.m-388a5213.js";import"./icons-c8f1c288.js";import"./index-3f94f77e.js";const D={title:"Checkbox",parameters:{layout:"padded"}},r=()=>{const[c,i]=h.useState();return t("div",{className:"flex flex-col gap-4",children:[e(o,{children:"Check me"}),e(o,{error:"Du må bekrefte for å fortsette",children:"Check me"}),t("div",{children:[e("h2",{className:"h4",children:"with form"}),t("form",{onSubmit:f=>{f.preventDefault(),i("Du må bekrefte for å fortsette")},children:[e(o,{error:c,children:"Check me"}),e(l,{type:"submit",children:"Submit"})]})]})]})};var s,m,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
//# sourceMappingURL=Checkbox.stories-0dfc05d8.js.map
