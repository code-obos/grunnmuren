---
"@obosbbl/grunnmuren-react": minor
---

New variants for the `<Hero>` component. The variant is controlled by the new prop: `variant`.

The `variant` is tied to an intended default heading size, either `xl` or `l`. Which means that each `variant` has it's own default heading styles. So in for the most part, you should never have to set both:

### standard, L heading
``` tsx
    // default: variant="standard" is default and heading size `l` is implicit for this variant
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
    // heading size `l` is implicit for the `full-bleed` variant
    <Hero variant="full-bleed">
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
### two-column
``` tsx
    // heading size `xl` is implicit for the `two-column` variant
    <Hero variant="two-column">
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


### standard with `xl` heading
``` tsx
    // variant="standard" is default so that prop can be omitted, and the heading size set to `xl` on the `<Heading>`
    <Hero>
        <Content>
            <Heading level={1} size="xl">Dette er en Hero</Heading>
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

### Heading
To achieve this control of the heading size a new `size` prop has been added to the `<Heading>` component. This way we can implement the same API for the Card component (which should support different heading sizes as well).

### Breaking change to `UNSAFE_Hero`
This introduces a breaking change to the beta version of the `<Hero>`, which is to be expected without a major release. If you are currently using `UNSAFE_Hero` you would now have to pass `variant="full-bleed"` as a prop to your component to get the same design as before.
