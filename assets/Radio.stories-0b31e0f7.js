'use client';
import{j as e}from"./jsx-runtime-7c577f00.js";import{r as C}from"./index-56a930d9.js";import{R as s,e as a}from"./TextField-bf8de8fb.js";import"./Alert-9d440a00.js";import"./ButtonColorContext-15ca7770.js";import"./index-e979ca2b.js";import"./clsx-388a5213.js";import"./icons-97368486.js";const A={title:"Radio",parameters:{layout:"padded"}},r=()=>e.jsxs(s,{name:"form-name",defaultValue:"2",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]}),t=()=>{const[o,d]=C.useState("2");return e.jsxs(s,{name:"form-name",value:o,onChange:d,children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]})},i=()=>e.jsxs(s,{name:"form-name",label:"Radio label",required:!0,description:"Radio help text",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]}),l=()=>e.jsx(a,{value:"1",children:"Very long label that spans multiple lines on very small screens. The radio input should be vertically centered to the first line of the text, not the center of the whole height of the text label"}),n=()=>{const[o,d]=C.useState("");return e.jsxs(s,{name:"form-name",description:"Click on one of the options below to remove error-message",value:o,onChange:d,error:o?"":"Feltet er påkrevd",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]})};var u,c,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  return <RadioGroup name="form-name" defaultValue="2">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var R,p,h;t.parameters={...t.parameters,docs:{...(R=t.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('2');
  return <RadioGroup name="form-name" value={value} onChange={setValue}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var v,x,f;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`() => {
  return <RadioGroup name="form-name" label="Radio label" required description="Radio help text">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var j,g,b;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  return <Radio value="1">
      Very long label that spans multiple lines on very small screens. The radio
      input should be vertically centered to the first line of the text, not the
      center of the whole height of the text label
    </Radio>;
}`,...(b=(g=l.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var V,G,S;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  return <RadioGroup name="form-name" description="Click on one of the options below to remove error-message" value={value} onChange={setValue} error={!value ? 'Feltet er påkrevd' : ''}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(S=(G=n.parameters)==null?void 0:G.docs)==null?void 0:S.source}}};const B=["Uncontrolled","Controlled","WithLabelAndHelpText","WithLongLabelThatBreaksLines","WithErrorText"];export{t as Controlled,r as Uncontrolled,n as WithErrorText,i as WithLabelAndHelpText,l as WithLongLabelThatBreaksLines,B as __namedExportsOrder,A as default};
//# sourceMappingURL=Radio.stories-0b31e0f7.js.map
