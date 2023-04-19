'use client';
import{j as e,a as p}from"./jsx-runtime-289d1c53.js";import{H as d,n as g,o as u,p as y}from"./TextField-757c3524.js";import"./Alert-d71c7b8a.js";import{B as t}from"./ButtonColorContext-939c9d97.js";import"./index-d551b1cc.js";import"./index-9a95590f.js";import"./clsx.m-388a5213.js";import"./icons-c8f1c288.js";import"./index-3f94f77e.js";const j={title:"Hero",argTypes:{contentPosition:{options:["below-center","below-left","top-left","bottom-left","top-right","bottom-right","center","vertical-split"],control:{type:"select"}},bgColor:{options:["white","blue","green"],control:{type:"select"}}}},h="Velkommen til visning",H="Se hva vi selger der du vil bo og finn drømmeboligen til fastpris. Du kan forhåndsbestille visning eller kontakte prosjektselgerne – påmeldingsskjema og kontaktinformasjon finner du på hvert enkelt boligprosjekt.",b={src:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_600,h_700/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",mdSrc:"https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/c_fill,g_auto,w_1280/f_auto,q_auto/v1578381769/Hammersborg%20Inkasso/2018_Bank_003",alt:"To personer finner svar på spørsmål via kundeservicesidene"};function o(n){const f=e(y,{...b});return e(d,{image:f,...n,children:e(g,{heading:h,description:H,children:p(u,{children:[e(t,{children:"Primary"}),e(t,{variant:"secondary",children:"Secondary"})]})})})}o.args={contentPosition:"below-center",bgColor:"white"};function r(n){return e(d,{...n,children:e(g,{heading:h,description:H,children:p(u,{children:[e(t,{children:"Primary"}),e(t,{variant:"secondary",children:"Secondary"})]})})})}r.args={contentPosition:"below-center",bgColor:"white"};var i,a,s;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`function WithImage(props: HeroProps) {
  const heroImage = <HeroImage {...image} />;
  return <Hero image={heroImage} {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>;
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var c,m,l;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`function WithoutImage(props: HeroProps) {
  return <Hero {...props}>
      <HeroContent heading={heading} description={description}>
        <HeroActions>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </HeroActions>
      </HeroContent>
    </Hero>;
}`,...(l=(m=r.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};const W=["WithImage","WithoutImage"];export{o as WithImage,r as WithoutImage,W as __namedExportsOrder,j as default};
//# sourceMappingURL=Hero.stories-6cf6888d.js.map
