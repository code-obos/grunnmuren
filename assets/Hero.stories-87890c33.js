'use client';
import{j as e}from"./jsx-runtime-bb3e4369.js";import{H as l,n as d,o as g,p as f}from"./TextField-83dd4dbb.js";import"./Alert-2387b44f.js";import{B as t}from"./ButtonColorContext-75fe5a6c.js";import"./index-f782f570.js";import"./index-8aa52469.js";import"./clsx.m-388a5213.js";import"./icons-7ac97d86.js";import"./index-2c1fe7d2.js";const P={title:"Hero",argTypes:{contentPosition:{options:["below-center","below-left","top-left","bottom-left","top-right","bottom-right","center","vertical-split"],control:{type:"select"}},bgColor:{options:["white","blue","green"],control:{type:"select"}}}},u="Velkommen til visning",h="Se hva vi selger der du vil bo og finn drømmeboligen til fastpris. Du kan forhåndsbestille visning eller kontakte prosjektselgerne – påmeldingsskjema og kontaktinformasjon finner du på hvert enkelt boligprosjekt.",y={src:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_600,h_700/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",mdSrc:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_1280/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",alt:"To personer finner svar på spørsmål via kundeservicesidene"};function o(n){const H=e.jsx(f,{...y});return e.jsx(l,{image:H,...n,children:e.jsx(d,{heading:u,description:h,children:e.jsxs(g,{children:[e.jsx(t,{children:"Primary"}),e.jsx(t,{variant:"secondary",children:"Secondary"})]})})})}o.args={contentPosition:"below-center",bgColor:"white"};function r(n){return e.jsx(l,{...n,children:e.jsx(d,{heading:u,description:h,children:e.jsxs(g,{children:[e.jsx(t,{children:"Primary"}),e.jsx(t,{variant:"secondary",children:"Secondary"})]})})})}r.args={contentPosition:"below-center",bgColor:"white"};var s,i,a;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`function WithImage(props: HeroProps) {
  const heroImage = <HeroImage {...image} />;
  return <Hero image={heroImage} {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>;
}`,...(a=(i=o.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var c,m,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`function WithoutImage(props: HeroProps) {
  return <Hero {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>;
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const C=["WithImage","WithoutImage"];export{o as WithImage,r as WithoutImage,C as __namedExportsOrder,P as default};
//# sourceMappingURL=Hero.stories-87890c33.js.map
