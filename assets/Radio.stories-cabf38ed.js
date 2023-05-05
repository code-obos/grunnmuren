'use client';
import{a as d,j as e}from"./jsx-runtime-3f8eccd4.js";import{r as T}from"./index-8aa52469.js";import{R as s,v as a}from"./TextField-5c3734f1.js";import"./Alert-b0e5aef2.js";import"./ButtonColorContext-45de720f.js";import"./index-e234cb07.js";import"./clsx.m-388a5213.js";import"./icons-67de8d50.js";import"./index-2c1fe7d2.js";const F={title:"Radio",parameters:{layout:"padded"}},r=()=>d(s,{name:"form-name",defaultValue:"2",children:[e(a,{value:"1",children:"Radio 1"}),e(a,{value:"2",children:"Radio 2"}),e(a,{value:"3",children:"Radio 3"})]}),t=()=>{const[o,u]=T.useState("2");return d(s,{name:"form-name",value:o,onChange:u,children:[e(a,{value:"1",children:"Radio 1"}),e(a,{value:"2",children:"Radio 2"}),e(a,{value:"3",children:"Radio 3"})]})},i=()=>d(s,{name:"form-name",label:"Radio label",required:!0,description:"Radio help text",children:[e(a,{value:"1",children:"Radio 1"}),e(a,{value:"2",children:"Radio 2"}),e(a,{value:"3",children:"Radio 3"})]}),l=()=>e(a,{value:"1",children:"Very long label that spans multiple lines on very small screens. The radio input should be vertically centered to the first line of the text, not the center of the whole height of the text label"}),n=()=>{const[o,u]=T.useState("");return d(s,{name:"form-name",description:"Click on one of the options below to remove error-message",value:o,onChange:u,error:o?"":"Feltet er påkrevd",children:[e(a,{value:"1",children:"Radio 1"}),e(a,{value:"2",children:"Radio 2"}),e(a,{value:"3",children:"Radio 3"})]})};var c,m,R;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <RadioGroup name="form-name" defaultValue="2">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(R=(m=r.parameters)==null?void 0:m.docs)==null?void 0:R.source}}};var p,h,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('2');
  return <RadioGroup name="form-name" value={value} onChange={setValue}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(v=(h=t.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var f,g,b;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  return <RadioGroup name="form-name" label="Radio label" required description="Radio help text">
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(b=(g=i.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var x,V,G;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  return <Radio value="1">
      Very long label that spans multiple lines on very small screens. The radio
      input should be vertically centered to the first line of the text, not the
      center of the whole height of the text label
    </Radio>;
}`,...(G=(V=l.parameters)==null?void 0:V.docs)==null?void 0:G.source}}};var S,C,L;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  return <RadioGroup name="form-name" description="Click on one of the options below to remove error-message" value={value} onChange={setValue} error={!value ? 'Feltet er påkrevd' : ''}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>;
}`,...(L=(C=n.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};const H=["Uncontrolled","Controlled","WithLabelAndHelpText","WithLongLabelThatBreaksLines","WithErrorText"];export{t as Controlled,r as Uncontrolled,n as WithErrorText,i as WithLabelAndHelpText,l as WithLongLabelThatBreaksLines,H as __namedExportsOrder,F as default};
//# sourceMappingURL=Radio.stories-cabf38ed.js.map
