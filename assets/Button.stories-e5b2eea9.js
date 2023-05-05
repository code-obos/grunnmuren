'use client';
import{a as c,F as l,j as t}from"./jsx-runtime-3f8eccd4.js";import{r as a}from"./index-8aa52469.js";import{a as p}from"./icons-3c10f61e.js";import{B as h}from"./ButtonColorContext-f84b5f1c.js";import"./clsx.m-388a5213.js";const r={Text:"Text",Icon:"Icon",TextIcon:"Text Icon",IconText:"Icon Text"},v={title:"Button",argTypes:{composition:{options:Object.values(r),control:"select",defaultValue:r.Text},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1}}},i=n=>{const{composition:s,disabled:e,loading:o}=n,b=({children:d})=>{switch(s){case r.Icon:return t(p,{});case r.TextIcon:return c(l,{children:[d,t(p,{})]});case r.IconText:return c(l,{children:[t(p,{}),d]});default:return d}},u=[t(h,{children:t(b,{children:"Button"})},"button"),t(h,{href:"#",children:t(b,{children:"Link"})},"link")];return c(l,{children:[t(m,{buttonProps:{disabled:e,loading:o},children:u}),t("div",{className:"bg-green-dark py-4",children:t(m,{buttonProps:{color:"mint",disabled:e,loading:o},children:u})}),t("div",{className:"bg-blue py-4",children:t(m,{buttonProps:{color:"white",disabled:e,loading:o},children:u})})]})},m=n=>{const{children:s,buttonProps:e={}}=n;return c(l,{children:[t(B,{children:a.Children.map(s,o=>a.cloneElement(o,e))}),t(B,{children:a.Children.map(s,o=>a.cloneElement(o,{variant:"secondary",...e}))})]})},B=n=>t("div",{className:"my-8 flex flex-row justify-center gap-8",...n});var g,f,x;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`(props: {
  composition: CompositionValue;
  disabled: boolean;
  loading: boolean;
}) => {
  const {
    composition,
    disabled,
    loading
  } = props;

  // Helper component that allows us to change the contentof the button when toggling the composition control in Storybook
  const ButtonContent = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    switch (composition) {
      case Composition.Icon:
        return <House />;
      case Composition.TextIcon:
        return <>
            {children}
            <House />
          </>;
      case Composition.IconText:
        return <>
            <House />
            {children}
          </>;
      default:
        return children;
    }
  };
  const buttons = [<Button key="button">
      {/* @ts-expect-error care */}
      <ButtonContent>Button</ButtonContent>
    </Button>, <Button key="link" href="#">
      {/* @ts-expect-error care */}
      <ButtonContent>Link</ButtonContent>
    </Button>];
  return <>
      <ButtonsDisplayer buttonProps={{
      disabled,
      loading
    }}>
        {buttons}
      </ButtonsDisplayer>

      <div className="bg-green-dark py-4">
        <ButtonsDisplayer buttonProps={{
        color: 'mint',
        disabled,
        loading
      }}>
          {buttons}
        </ButtonsDisplayer>
      </div>

      <div className="bg-blue py-4">
        <ButtonsDisplayer buttonProps={{
        color: 'white',
        disabled,
        loading
      }}>
          {buttons}
        </ButtonsDisplayer>
      </div>
    </>;
}`,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const D=["Default"];export{i as Default,D as __namedExportsOrder,v as default};
//# sourceMappingURL=Button.stories-e5b2eea9.js.map
