'use client';
import{j as t}from"./jsx-runtime-bb3e4369.js";import{r as i}from"./index-8aa52469.js";import{h as u}from"./icons-62399456.js";import{B as m}from"./ButtonColorContext-a19e28f2.js";import"./clsx.m-388a5213.js";const s={Text:"Text",Icon:"Icon",TextIcon:"Text Icon",IconText:"Icon Text"},I={title:"Button",argTypes:{composition:{options:Object.values(s),control:"select",defaultValue:s.Text},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1}}},c=n=>{const{composition:r,disabled:e,loading:o}=n,p=({children:l})=>{switch(r){case s.Icon:return t.jsx(u,{});case s.TextIcon:return t.jsxs(t.Fragment,{children:[l,t.jsx(u,{})]});case s.IconText:return t.jsxs(t.Fragment,{children:[t.jsx(u,{}),l]});default:return l}},a=[t.jsx(m,{children:t.jsx(p,{children:"Button"})},"button"),t.jsx(m,{href:"#",children:t.jsx(p,{children:"Link"})},"link")];return t.jsxs(t.Fragment,{children:[t.jsx(d,{buttonProps:{disabled:e,loading:o},children:a}),t.jsx("div",{className:"bg-green-dark py-4",children:t.jsx(d,{buttonProps:{color:"mint",disabled:e,loading:o},children:a})}),t.jsx("div",{className:"bg-blue py-4",children:t.jsx(d,{buttonProps:{color:"white",disabled:e,loading:o},children:a})})]})},d=n=>{const{children:r,buttonProps:e={}}=n;return t.jsxs(t.Fragment,{children:[t.jsx(x,{children:i.Children.map(r,o=>i.cloneElement(o,e))}),t.jsx(x,{children:i.Children.map(r,o=>i.cloneElement(o,{variant:"secondary",...e}))})]})},x=n=>t.jsx("div",{className:"my-8 flex flex-row justify-center gap-8",...n});var h,b,g;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`(props: {
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
}`,...(g=(b=c.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};const T=["Default"];export{c as Default,T as __namedExportsOrder,I as default};
//# sourceMappingURL=Button.stories-d1c10b3b.js.map
