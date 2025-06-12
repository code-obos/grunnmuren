---
"@obosbbl/grunnmuren-react": minor
---

Adding an `onChange` prop to the `<Carousel>` component. This prop can be used to track navigation within the `<Carousel>`.
The `onChange` callback that is triggered when a user navigates to new item in the Carousel. The argument to the callback is an object containing `index` of the a new item scrolled into view and the `id` of that item (if set on the `<CarouselItem>`). It also provides `prevIndex` which is the index of the previous item that was in view. And `prevId`, which is the id of the previous item that was in view (if set on the `<CarouselItem>`)

Usage:

``` tsx
<Carousel
  onChange={({ id, index, prevId, prevIndex }) => {
    console.log(`
      Carousel changed to item with id: "${id}" and index: ${index}.
      The previous item id was: "${prevId}" and index: ${prevIndex}.
      This indicates that the user navigated to the ${prevIndex < index ? 'next' : 'previous'} item.
    `);
  }}
>
  <CarouselItems>
    <CarouselItem id="first">
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem id="second">
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem id="third">
      <Media fit="contain">
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
  </CarouselItems>
</Carousel>
```
