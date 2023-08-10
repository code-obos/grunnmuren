'use client';
import{j as n}from"./jsx-runtime-50dc7401.js";import{r as g}from"./index-4b4b5343.js";import{z as k,D as p}from"./TextField-238ba5df.js";import"./Alert-725c8be1.js";import{B as b}from"./ButtonColorContext-f0617261.js";import"./index-c4d93cf4.js";import"./clsx.m-388a5213.js";import"./icons-1f77e4a8.js";const C={title:"Snackbar",parameters:{layout:"padded"}},f=[{id:"b57cf5e3-57b7-4ac0-8c83-7e2f242055f7",heading:"OBOS bidrar – dette er våre tiltak",intro:"",content:`<p>Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.</p>
<p><a href="https://www.obos.no/corona">Dette er v&aring;re tiltak</a></p>`},{id:"a47a5890-9a48-4302-b1a3-edf54d9b9997",heading:"Snackbar heading that is really long and should be truncated when snackbar is closed",intro:"",content:`<p>Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.</p>
<p><a href="https://www.obos.no/corona">Dette er v&aring;re tiltak</a></p>`}],h=[{id:"a47a5890-9a48-4302-b1a3-edf54d9b9297",heading:"Snackbar heading med egendefinert content",intro:"",content:"Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte."}],r=()=>{const[a,t]=g.useState([]);return n.jsxs("div",{className:"grid gap-2",children:[f.filter(e=>!a.includes(e.id)).map(e=>n.jsx(k,{id:e.id,heading:e.heading,closeSnackbar:()=>t([...a,e.id]),children:n.jsx(p,{dangerouslySetInnerHTML:{__html:`${e.content}`}})},e.id)),n.jsx(b,{onClick:()=>t([]),children:"Reset snackbars"})]})},i=()=>{const[a,t]=g.useState([]);return n.jsxs("div",{className:"grid gap-2",children:[h.filter(e=>!a.includes(e.id)).map(e=>n.jsx(k,{id:e.id,heading:e.heading,closeSnackbar:()=>t([...a,e.id]),children:n.jsx(p,{children:n.jsx("p",{children:e.content})})},e.id)),n.jsx(b,{onClick:()=>t([]),children:"Reset snackbars"})]})};var s,d,o;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);
  return <div className="grid gap-2">
      {pageNotifications.filter(n => !dismissedAlertIds.includes(n.id)).map(notification => <Snackbar id={notification.id} key={notification.id} heading={notification.heading} closeSnackbar={() => setDismissedAlertIds([...dismissedAlertIds, notification.id])}>
            <SnackbarContent dangerouslySetInnerHTML={{
        __html: \`\${notification.content}\`
      }} />
          </Snackbar>)}
      <Button onClick={() => setDismissedAlertIds([])}>Reset snackbars</Button>
    </div>;
}`,...(o=(d=r.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};var c,l,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>([]);
  return <div className="grid gap-2">
      {pageNotificationsWithOwnContent.filter(n => !dismissedAlertIds.includes(n.id)).map(notification => <Snackbar id={notification.id} key={notification.id} heading={notification.heading} closeSnackbar={() => setDismissedAlertIds([...dismissedAlertIds, notification.id])}>
            <SnackbarContent>
              <p>{notification.content}</p>
            </SnackbarContent>
          </Snackbar>)}
      <Button onClick={() => setDismissedAlertIds([])}>Reset snackbars</Button>
    </div>;
}`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const N=["Default","SnackbarWithContent"];export{r as Default,i as SnackbarWithContent,N as __namedExportsOrder,C as default};
//# sourceMappingURL=Snackbar.stories-27b852c6.js.map
