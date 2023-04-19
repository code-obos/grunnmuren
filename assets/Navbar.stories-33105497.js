'use client';
import{a as r,j as e}from"./jsx-runtime-289d1c53.js";import{r as b}from"./index-9a95590f.js";import{N as p,q as h,r as u,s as N,t as x,u as f}from"./TextField-d771e04e.js";import"./Alert-d26d7392.js";import{B as g}from"./ButtonColorContext-2301757a.js";import"./index-d551b1cc.js";import"./clsx.m-388a5213.js";import"./icons-17850174.js";import"./index-3f94f77e.js";const w={title:"Navbar"},I=["Forsiden","Ny bolig","Brukt bolig","Medlem","Bank","Forsikring","Samfunnsansvar","Dette er OBOS"],i=()=>e(g,{variant:"secondary",children:"Bli medlem"}),t=()=>{const[m,d]=b.useState(),c=(n,a)=>{n.preventDefault(),d(a)};return r(p,{children:[e(h,{logo:e("a",{href:"#","aria-label":"Til startsiden for OBOS",children:e("img",{className:"max-md:w-[100px]",src:"/obos_liggende_hus_hvit.svg",width:"173",height:"41"})}),children:e(i,{})}),r(u,{children:[e(N,{children:I.map((n,a)=>e(x,{active:a===m,onClick:v=>c(v,a),href:"#",children:n},a))}),e(f,{children:e(i,{})})]})]})};var s,o,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
}`,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const j=["Default"];export{t as Default,j as __namedExportsOrder,w as default};
//# sourceMappingURL=Navbar.stories-33105497.js.map
