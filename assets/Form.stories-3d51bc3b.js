'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{r as _}from"./index-4b4b5343.js";import{h as c,i as $,j as O,k as w,l as z,m as I,n as J,u as K,o as p,T as u}from"./TextField-e7b77656.js";import"./Alert-825a929a.js";import{B as d}from"./ButtonColorContext-c9fa9468.js";import"./index-c4d93cf4.js";import"./clsx.m-388a5213.js";import"./icons-09d9cb54.js";const re={title:"Forms",parameters:{layout:"padded"}},r=()=>e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(c,{children:"First name"}),e.jsx(c,{isRequired:!0,children:"First name"})]}),t=()=>e.jsx($,{children:"The field is required"}),s=()=>e.jsx(O,{}),o=()=>e.jsx(w,{children:"Helper text"}),a=()=>e.jsx(z,{heading:"Form title",children:"This is a form container"}),m=()=>e.jsx(I,{}),n=()=>{const A=()=>{const{submitAndNextFormStep:i}=K(1),[P,R]=_.useState("blank");return e.jsx(p,{step:1,heading:"Form step 1",formStatus:P,onSubmit:C=>{C.preventDefault(),R("completed"),i({name:"test"})},children:e.jsxs("div",{className:"grid gap-4",children:[e.jsx(u,{label:"name"}),e.jsx(d,{type:"submit",children:"Submit"})]})})},G=()=>e.jsx(p,{step:2,heading:"Form step 2",formStatus:"blank",onSubmit:i=>i.preventDefault(),children:e.jsxs("div",{className:"grid gap-4",children:[e.jsx(u,{label:"name"}),e.jsx(d,{type:"submit",children:"Submit"})]})});return e.jsx(J,{children:e.jsxs("div",{className:"grid gap-2",children:[e.jsx(A,{}),e.jsx(G,{})]})})};var l,F,S;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  return <div className="flex flex-col gap-4">
      <FormLabel>First name</FormLabel>
      <FormLabel isRequired>First name</FormLabel>
    </div>;
}`,...(S=(F=r.parameters)==null?void 0:F.docs)==null?void 0:S.source}}};var x,g,b;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  return <FormErrorMessage>The field is required</FormErrorMessage>;
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var h,f,j;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <FormSuccess />;
}`,...(j=(f=s.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};var v,T,E;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  return <FormHelperText>Helper text</FormHelperText>;
}`,...(E=(T=o.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};var N,H,L;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`() => {
  return <GmForm heading="Form title">This is a form container</GmForm>;
}`,...(L=(H=a.parameters)==null?void 0:H.docs)==null?void 0:L.source}}};var M,B,k;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  return <GmFormError />;
}`,...(k=(B=m.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};var y,D,q;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const FormStep1 = () => {
    const {
      submitAndNextFormStep
    } = useFormStepContext<FormData1>(1);
    const [formStatus, setFormStatus] = useState<FormStatus>('blank');
    return <FormStep step={1} heading="Form step 1" formStatus={formStatus} onSubmit={data => {
      data.preventDefault();
      setFormStatus('completed');
      submitAndNextFormStep({
        name: 'test'
      });
    }}>
        <div className="grid gap-4">
          <TextField label="name" />
          <Button type="submit">Submit</Button>
        </div>
      </FormStep>;
  };
  const FormStep2 = () => {
    return <FormStep step={2} heading="Form step 2" formStatus="blank" onSubmit={e => e.preventDefault()}>
        <div className="grid gap-4">
          <TextField label="name" />
          <Button type="submit">Submit</Button>
        </div>
      </FormStep>;
  };
  return <FormStepProvider>
      <div className="grid gap-2">
        <FormStep1 />

        <FormStep2 />
      </div>
    </FormStepProvider>;
}`,...(q=(D=n.parameters)==null?void 0:D.docs)==null?void 0:q.source}}};const te=["Label","ErrorMessage","Success","HelperText","Form","FormError","MultiStep"];export{t as ErrorMessage,a as Form,m as FormError,o as HelperText,r as Label,n as MultiStep,s as Success,te as __namedExportsOrder,re as default};
//# sourceMappingURL=Form.stories-3d51bc3b.js.map
