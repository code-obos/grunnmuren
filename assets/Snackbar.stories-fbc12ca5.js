'use client';
import{j as n}from"./jsx-runtime-bb3e4369.js";import{r as g}from"./index-8aa52469.js";import{w as k,x as p}from"./TextField-786e8cb3.js";import"./Alert-3f3fcc30.js";import{B as b}from"./ButtonColorContext-5d670d92.js";import"./index-f782f570.js";import"./clsx.m-388a5213.js";import"./icons-d6e7fddb.js";const D={title:"Snackbar",parameters:{layout:"padded"}},f=[{id:"b57cf5e3-57b7-4ac0-8c83-7e2f242055f7",heading:"OBOS bidrar – dette er våre tiltak",intro:"",content:`<p>Norge og verden er n&aring; inne i krevende tider. OBOS skal bidra i den nasjonale dugnaden og vi gj&oslash;r det vi kan for &aring; v&aelig;re i normal drift. Vi har derfor satt inn en rekke tiltak for &aring; beskytte v&aring;re medlemmer, samarbeidspartnere, kunder og ansatte fra smitte.</p>
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
}`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const N=["Default","SnackbarWithContent"];export{r as Default,i as SnackbarWithContent,N as __namedExportsOrder,D as default};
//# sourceMappingURL=Snackbar.stories-fbc12ca5.js.map
