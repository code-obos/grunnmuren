'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{r as v}from"./index-8aa52469.js";import{N as b,q as x,r as p,s as h,t as u,u as N}from"./TextField-83dd4dbb.js";import"./Alert-2387b44f.js";import{B as f}from"./ButtonColorContext-75fe5a6c.js";import"./index-f782f570.js";import"./clsx.m-388a5213.js";import"./icons-7ac97d86.js";import"./index-2c1fe7d2.js";const S={title:"Navbar"},g=["Forsiden","Ny bolig","Brukt bolig","Medlem","Bank","Forsikring","Samfunnsansvar","Dette er OBOS"],r=()=>e.jsx(f,{variant:"secondary",children:"Bli medlem"}),t=()=>{const[l,m]=v.useState(),d=(n,a)=>{n.preventDefault(),m(a)};return e.jsxs(b,{children:[e.jsx(x,{logo:e.jsx("a",{href:"#","aria-label":"Til startsiden for OBOS",children:e.jsx("img",{className:"max-md:w-[100px]",src:"/obos_liggende_hus_hvit.svg",width:"173",height:"41"})}),children:e.jsx(r,{})}),e.jsxs(p,{children:[e.jsx(h,{children:g.map((n,a)=>e.jsx(u,{active:a===l,onClick:c=>d(c,a),href:"#",children:n},a))}),e.jsx(N,{children:e.jsx(r,{})})]})]})};var s,i,o;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(o=(i=t.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,S as default};
//# sourceMappingURL=Navbar.stories-dc3844ad.js.map
