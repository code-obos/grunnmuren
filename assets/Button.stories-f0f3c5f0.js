'use client';
import{j as t}from"./jsx-runtime-bb3e4369.js";import{r as i}from"./index-8aa52469.js";import{h as u}from"./icons-685c1cb7.js";import{B as m}from"./ButtonColorContext-1e57e4db.js";import"./clsx.m-388a5213.js";const s={Text:"Text",Icon:"Icon",TextIcon:"Text Icon",IconText:"Icon Text"},I={title:"Button",argTypes:{composition:{options:Object.values(s),control:"select",defaultValue:s.Text},disabled:{control:"boolean",defaultValue:!1},loading:{control:"boolean",defaultValue:!1}}},a=e=>{const{composition:r,disabled:n,loading:o}=e,p=({children:c})=>{switch(r){case s.Icon:return t.jsx(u,{});case s.TextIcon:return t.jsxs(t.Fragment,{children:[c,t.jsx(u,{})]});case s.IconText:return t.jsxs(t.Fragment,{children:[t.jsx(u,{}),c]});default:return c}},l=[t.jsx(m,{children:t.jsx(p,{children:"Button"})},"button"),t.jsx(m,{href:"#",children:t.jsx(p,{children:"Link"})},"link")];return t.jsxs(t.Fragment,{children:[t.jsx(d,{buttonProps:{disabled:n,loading:o},children:l}),t.jsx("div",{className:"bg-green-dark py-4",children:t.jsx(d,{buttonProps:{color:"mint",disabled:n,loading:o},children:l})}),t.jsx("div",{className:"bg-blue py-4",children:t.jsx(d,{buttonProps:{color:"white",disabled:n,loading:o},children:l})})]})},d=e=>{const{children:r,buttonProps:n={}}=e;return t.jsxs(t.Fragment,{children:[t.jsx(x,{children:i.Children.map(r,o=>i.cloneElement(o,n))}),t.jsx(x,{children:i.Children.map(r,o=>i.cloneElement(o,{variant:"secondary",...n}))})]})},x=e=>t.jsx("div",{className:"my-8 flex flex-row justify-center gap-8",...e});var h,b,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`(props: {
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
      <ButtonContent>Button</ButtonContent>
    </Button>, <Button key="link" href="#">
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
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};const T=["Default"];export{a as Default,T as __namedExportsOrder,I as default};
//# sourceMappingURL=Button.stories-f0f3c5f0.js.map
