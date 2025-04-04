---
"@obosbbl/grunnmuren-tailwind": major
"@obosbbl/grunnmuren-react": major
---

# Upgrade to Tailwind 4

Tailwind is upgraded to v4. The `grunnmuren-tailwind` package is now CSS-first configured. And the previously exposed JS config file is now replaced by a CSS config file.

The `legacyV1Compatibility` option is now removed, so your project has to be fully upgraded to Grunnmuren v2.

## Migration
1. Upgrade your project to Tailwind 4. You can try the [migration guide](https://tailwindcss.com/docs/upgrade-guide)
 from tailwind.
2. Add `@import "@obosbbl/grunnmuren-tailwind";` to the top of the main CSS file of your project. This is the new CSS configuration file for Grunnmuren.
3. If you have a JS/TS `tailwind.config` in your project and would like to keep it. You can include it in the main CSS file (mentioned in step 2), by using the `@config` directive, e.g: `@config '../tailwind.config.ts';`. Read more [here](https://tailwindcss.com/docs/functions-and-directives#compatibility).
4. If you would like to get rid of the old tailwind.config. You can move all your configuration to the main CSS file of your project. Tailwind 4 has automatic content detection, but if you need to include some excluded source you can use the `@source` directive, e.g: `@source "./node_modules/@obosbbl/grunnmuren-react/dist";`. You can also extend the `@obosbbl/grunnmuren-tailwind` config by using various directives such as `@base` or `@theme`.
5. Finally, if you want to use the font fallback option: add `@import "@obosbbl/grunnmuren-tailwind/font-fallback";` **below** `@import "@obosbbl/grunnmuren-tailwind";`:

``` CSS
@import "@obosbbl/grunnmuren-tailwind";
@import "@obosbbl/grunnmuren-tailwind/font-fallback";
```

Here is an example of what your main CSS file __might__ look like after migration:

``` CSS
@import "@obosbbl/grunnmuren-tailwind";
@import "@obosbbl/grunnmuren-tailwind/font-fallback";

@source "../../node_modules/@obosbbl/grunnmuren-react/dist";
@source "../../node_modules/@code-obos/obos-layout/dist"

@theme {
  --animate-custom: custom-animation 1s ease-in-out infinite;
  @keyframes custom-animation {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}

@utility my-custom-util {
  @apply flex flex-col min-h-screen;
}
```