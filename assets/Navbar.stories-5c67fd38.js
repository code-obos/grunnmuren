'use client';
import{j as e}from"./jsx-runtime-50dc7401.js";import{r as v}from"./index-4b4b5343.js";import{N as b,s as x,t as p,v as h,w as u,x as N}from"./TextField-09c7bfea.js";import"./Alert-f8cc820b.js";import{B as f}from"./ButtonColorContext-2aa110c1.js";import"./index-c4d93cf4.js";import"./clsx.m-388a5213.js";import"./icons-1e1e4f63.js";const O={title:"Navbar"},g=["Forsiden","Ny bolig","Brukt bolig","Medlem","Bank","Forsikring","Samfunnsansvar","Dette er OBOS"],r=()=>e.jsx(f,{variant:"secondary",children:"Bli medlem"}),t=()=>{const[l,m]=v.useState(),d=(n,a)=>{n.preventDefault(),m(a)};return e.jsxs(b,{children:[e.jsx(x,{logo:e.jsx("a",{href:"#","aria-label":"Til startsiden for OBOS",children:e.jsx("img",{className:"max-md:w-[100px]",src:"/obos_liggende_hus_hvit.svg",width:"173",height:"41"})}),children:e.jsx(r,{})}),e.jsxs(p,{children:[e.jsx(h,{children:g.map((n,a)=>e.jsx(u,{active:a===l,onClick:c=>d(c,a),href:"#",children:n},a))}),e.jsx(N,{children:e.jsx(r,{})})]})]})};var s,i,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const handleClick = (event: React.MouseEvent, itemIndex: number) => {
    event.preventDefault();
    setActiveIndex(itemIndex);
  };
  return <Navbar>
      <NavbarContent logo={<a href="#" aria-label="Til startsiden for OBOS">
            <img className="max-md:w-[100px]" src="/obos_liggende_hus_hvit.svg" width="173" height="41" />
          </a>}>
        <BliMedlemButton />
      </NavbarContent>
      <NavbarCollapsible>
        <NavbarItems>
          {navItems.map((item, index) => <NavbarItem active={index === activeIndex} key={index} onClick={e => handleClick(e, index)} href="#">
              {item}
            </NavbarItem>)}
        </NavbarItems>
        <NavbarExpandedMobileContent>
          <BliMedlemButton />
        </NavbarExpandedMobileContent>
      </NavbarCollapsible>
    </Navbar>;
}`,...(o=(i=t.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const S=["Default"];export{t as Default,S as __namedExportsOrder,O as default};
//# sourceMappingURL=Navbar.stories-5c67fd38.js.map