'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{r as y}from"./index-4b4b5343.js";import{R as s,y as a}from"./TextField-f2c7fbdf.js";import"./Alert-18a1b915.js";import"./ButtonColorContext-5d8c18df.js";import"./index-d4844545.js";import"./clsx-388a5213.js";import"./icons-83dcd547.js";const A={title:"Radio",parameters:{layout:"padded"}},r=()=>e.jsxs(s,{name:"form-name",defaultValue:"2",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]}),t=()=>{const[o,d]=y.useState("2");return e.jsxs(s,{name:"form-name",value:o,onChange:d,children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]})},i=()=>e.jsxs(s,{name:"form-name",label:"Radio label",required:!0,description:"Radio help text",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]}),l=()=>e.jsx(a,{value:"1",children:"Very long label that spans multiple lines on very small screens. The radio input should be vertically centered to the first line of the text, not the center of the whole height of the text label"}),n=()=>{const[o,d]=y.useState("");return e.jsxs(s,{name:"form-name",description:"Click on one of the options below to remove error-message",value:o,onChange:d,error:o?"":"Feltet er påkrevd",children:[e.jsx(a,{value:"1",children:"Radio 1"}),e.jsx(a,{value:"2",children:"Radio 2"}),e.jsx(a,{value:"3",children:"Radio 3"})]})};var u,c,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
//# sourceMappingURL=Radio.stories-58b274af.js.map