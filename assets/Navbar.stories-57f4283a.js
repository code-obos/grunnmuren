'use client';
import{j as e}from"./jsx-runtime-7f3d8b90.js";import{r as v}from"./index-68775723.js";import{N as b,f as x,g as p,h,i as u,j as N}from"./TextField-30e8996a.js";import"./Alert-11432db4.js";import{B as f}from"./ButtonColorContext-f01cb479.js";import"./index-9353d67f.js";import"./clsx-388a5213.js";import"./icons-0cd9b5f5.js";const O={title:"Navbar"},g=["Forsiden","Ny bolig","Brukt bolig","Medlem","Bank","Forsikring","Samfunnsansvar","Dette er OBOS"],r=()=>e.jsx(f,{variant:"secondary",children:"Bli medlem"}),t=()=>{const[l,d]=v.useState(),m=(n,a)=>{n.preventDefault(),d(a)};return e.jsxs(b,{children:[e.jsx(x,{logo:e.jsx("a",{href:"#","aria-label":"Til startsiden for OBOS",children:e.jsx("img",{className:"w-[100px] md:w-[149px]",src:"/obos_liggende_hus_hvit.svg",width:"173",height:"41"})}),children:e.jsx(r,{})}),e.jsxs(p,{children:[e.jsx(h,{children:g.map((n,a)=>e.jsx(u,{active:a===l,onClick:c=>m(c,a),href:"#",children:n},a))}),e.jsx(N,{children:e.jsx(r,{})})]})]})};var s,i,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const handleClick = (event: React.MouseEvent, itemIndex: number) => {
    event.preventDefault();
    setActiveIndex(itemIndex);
  };
  return <Navbar>
      <NavbarContent logo={<a href="#" aria-label="Til startsiden for OBOS">
            <img className="w-[100px] md:w-[149px]" src="/obos_liggende_hus_hvit.svg" width="173" height="41" />
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
//# sourceMappingURL=Navbar.stories-57f4283a.js.map