---
"@obosbbl/grunnmuren-tailwind": minor
"@obosbbl/grunnmuren-react": minor
---

# Carousel

## grunnmuren-react
New `Carousel` component that can be used for any content, all though primarily intended for media such as images and `VideoLoops`.

## Usage
``` tsx
<Carousel>
  <CarouselItems>
  <CarouselItem>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
        alt=""
      />
    </Media>
  </CarouselItem>
  <CarouselItem>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
        alt=""
      />
      </CarouselI
  </Media>tem>
  <CarouselItem>
    // This image has a portrait aspect ratio
    <Media fit="contain">
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
        alt=""
      />
    </Media>
  </CarouselItem>
  <CarouselItem>
    <Media>
      <img
        src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
        alt=""
      />
    </Media>
  </CarouselItem>
  </CarouselItems>
</Carousel>
```

Use the `fit` prop on the `<Media>` primitive to control the `object-fit` (`cover` | `contain`) behavior of it's children, this is a way to prevent cropping of images in portrait format. This defaults to `cover`, so for portrait images set it to `contain`.

### In Hero

The component can also be used inside the `<Hero>` component:
``` tsx
<Hero variant="full-bleed">
  <Content>
    <Heading level={1}>Ulven</Heading>
    <Description>– et nytt nabolag i Oslo</Description>
  </Content>
  <Carousel>
    <CarouselItems>
    <CarouselItem>
      <CarouselItem>
      <Media>
        <VideoLoop
          src="https://res.cloudinary.com/obosit-prd-ch-clry/video/upload/v1732199756/Mellom%20husene/Frysja_Loop2.mp4"
          format="mp4"
          alt="En postbil kjører rundt i det moderne nabolaget på Frysja. Her finnes det fine uteområder, med husker og kafeer."
        />
      </Media>
      </CarouselItem>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_2048,q_auto/v1582122753/Boligprosjekter/Oslo/Ulven/Ulven-N%C3%A6romr%C3%A5de-Oslo-OBOS-Construction-city.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1587988823/Boligprosjekter/Oslo/Frysjaparken/Frysjalia/Frysjaparken_interi%C3%B8r_30.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      // This image has a portrait aspect ratio
      <Media fit="contain">
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/f_auto,c_limit,w_1080,q_auto:best/t_2_3/v1747985572/Temasider/Folk/Hans%20Petter%20%20-%20Trang%20f%C3%B8dsel/Obos-Hans-Petter-Aaserud-Photo-Einar-Aslaksen-03093_web.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    <CarouselItem>
      <Media>
        <img
          src="https://res.cloudinary.com/obosit-prd-ch-clry/image/upload/v1699879884/Boligprosjekter/Oslo/Frysjaparken/Ager/Originale%20bilder/OBOS_Frysja-Ager-Illustrasjon_av_Frysja_torg_i_Ager_borettslag.jpg"
          alt=""
        />
      </Media>
    </CarouselItem>
    </CarouselItems>
  </Carousel>
</Hero>
```

## grunnmuren-tailwind

A new `scrollbar-hidden` utility class has been added which hides scorllbar visually. This is needed in the `<Carousel>` component, as it uses `snap-scroll`.
