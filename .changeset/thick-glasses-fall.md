---
"@obosbbl/grunnmuren-react": minor
---

New variants for the `<Hero>` component. The layout can now be controlled using a `layout` prop. The level of the page where the `<Hero>` is put can be controlled with a `level` prop. The `level` is tied to an intended default layout. Which means that each `layout` has it's own default `level`. So in reality, you should never have to set both:

``` tsx
    // default: layout="standard" and level={2} is implicit
    <Hero>
        <Content>
            <Heading level={1}>Dette er en Hero</Heading>
            <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
            <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt=""
            />
        </Media>
    </Hero>
```

``` tsx
    // level={2} is implicit
    <Hero layout="full-bleed">
        <Content>
            <Heading level={1}>Dette er en Hero</Heading>
            <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
            <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt=""
            />
        </Media>
    </Hero>
```

``` tsx
    // level={1} is implicit
    <Hero layout="two-column">
        <Content>
            <Heading level={1}>Dette er en Hero</Heading>
            <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
            <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt=""
            />
        </Media>
    </Hero>
```

``` tsx
    // layout="standard" is default
    <Hero level={1}>
        <Content>
            <Heading level={1}>Dette er en Hero</Heading>
            <Description>– et samarbeidsprosjekt med Nordr</Description>
        </Content>
        <Media>
            <img
            src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
            alt=""
            />
        </Media>
    </Hero>
```