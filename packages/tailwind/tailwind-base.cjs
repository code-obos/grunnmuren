const plugin = require('tailwindcss/plugin');

// naively assume all fonts are hosted at the following paths at the root of the app
const gorditaFonts = [
  {
    fontWeight: 400,
    fontStyle: 'normal',
    url: '/gorditaregular-webfont.woff2',
  },
  {
    fontWeight: 400,
    fontStyle: 'italic',
    url: '/gorditaregularitalic-webfont.woff2',
  },
  {
    fontWeight: 500,
    fontStyle: 'normal',
    url: '/gorditamedium-webfont.woff2',
  },
  {
    fontWeight: 700,
    fontStyle: 'normal',
    url: '/gorditabold-webfont.woff2',
  },
];

const obosFonts = [
  {
    fontWeight: 400,
    fontStyle: 'normal',
    url: '/OBOSText-Regular.woff2',
  },
  {
    fontWeight: 400,
    fontStyle: 'italic',
    url: '/OBOSText-Italic.woff2',
  },
  {
    fontWeight: 500,
    fontStyle: 'normal',
    url: '/OBOSText-Medium.woff2',
  },
  {
    fontWeight: 700,
    fontStyle: 'normal',
    url: '/OBOSText-Bold.woff2',
  },
];

const button = plugin(function ({ addComponents }) {
  // adds a shade on the button when hovered
  // ideally this would be solved by just darkening the button background,
  // but that doesn't really work since some of the button variations have transparent backgrounds
  addComponents({
    '.button': {
      '&::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'transparent',
        display: 'block',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        borderRadius: '0.75rem',
      },
      '&:hover::after': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '0.375rem',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });
});

const checkbox = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.checkbox': {
      '&::before': {
        content: '""',
        width: '0.65em',
        height: '0.65em',
        transform: 'scale(0)',
        transition: '120ms transform ease-in-out',
        backgroundColor: theme('colors.white'),
        'box-shadow': 'inset 1em 1em currentColor',
        'clip-path':
          'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
      },
      '&:checked::before': {
        transform: 'scale(1)',
      },
    },
  });
});

const headings = plugin(function ({ addBase, addComponents }) {
  const h1 = '@apply font-bold text-3xl md:text-5xl';
  const h2 = '@apply font-bold text-2xl md:text-4xl';
  const h3 = '@apply font-bold text-xl md:text-2xl';
  const h4 = '@apply font-bold text-lg md:text-xl';

  addBase({
    h1: {
      [h1]: {},
    },
    h2: {
      [h2]: {},
    },
    h3: {
      [h3]: {},
    },
    h4: {
      [h4]: {},
    },
  });

  addComponents({
    '.h1': {
      [h1]: {},
    },
    '.h2': {
      [h2]: {},
    },
    '.h3': {
      [h3]: {},
    },
    '.h4': {
      [h4]: {},
    },
  });
});

const snackbar = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.snackbar': {
      'grid-template-columns': 'min-content auto',
      'grid-template-areas': '"icon header" ". content" "actions actions"',
    },
    [`@media(min-width: ${theme('screens.md')})`]: {
      '.snackbar': {
        'grid-template-columns': 'min-content auto auto',
        'grid-template-areas': '"icon header actions" ". content content"',
      },
    },
    '.snackbar-icon': {
      'grid-area': 'icon',
    },
    '.snackbar-header': {
      'grid-area': 'header',
    },
    '.snackbar-content': {
      'grid-area': 'content',
    },
    '.snackbar-actions': {
      'grid-area': 'actions',
    },
  });
});

const defaultOpts = {
  useLegacyFont: false,
  fontBasePath: '/fonts',
  useLegacyContainerSize: false,
};

module.exports = (userOptions) => {
  const opts = userOptions ? { ...defaultOpts, ...userOptions } : defaultOpts;
  let fontFamily = 'OBOSFont';
  let fonts = obosFonts;
  let containerSize = '92rem';
  if (opts.useLegacyFont) {
    fontFamily = 'Gordita';
    fonts = gorditaFonts;
  }

  if (opts.useLegacyContainerSize) {
    containerSize = '82rem';
  }

  return {
    plugins: [
      // TODO: Remove the aspect ratio plugin when Safari 14 usage is low enough
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/typography'),
      button,
      headings,
      checkbox,
      snackbar,
      plugin(function ({ addBase, addUtilities, addComponents, theme }) {
        addBase({
          html: {
            '@apply text-black antialiased font-normal': {},
          },
          b: {
            fontWeight: 500,
          },
          strong: {
            fontWeight: 500,
          },
          a: {
            '@apply underline': {},
          },
          '::selection': { '@apply bg-green-light text-black': {} },
          // Remove the disclosure triangle in Safari if apply the `list-none` utility to the summary element
          'summary.list-none::-webkit-details-marker': {
            display: 'none',
          },
        });
        addComponents({
          '.container': {
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: containerSize,
          },
          '.container-prose': {
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '39rem',
          },
          // that thin blue line at the top
          '.topline::before': {
            display: 'block',
            width: '100%',
            height: '5px',
            content: '""',
            position: 'fixed',
            left: '0',
            top: '0',
            right: '0',
            backgroundColor: theme('colors.blue.DEFAULT'),
            zIndex: '100',
          },
          /**
           * Round the corners of our main content.
           * Protip: Use this together with navbar, footer and `bg-blue` class on the body.
           */
          '.pagemain': {
            backgroundColor: '#fff',
            borderRadius: '2rem',
            overflow: 'hidden',
          },
        });
        addUtilities({
          // imitates a bold font, but doesn't cause layout due to element width change like with font-weight
          // Note that this CSS isn't standardized, but it works in Fx, Chrome, Safari and Edge
          '.fake-font-bold': {
            '-webkit-text-stroke': '1px',
          },
        });
      }),
      plugin(function ({ addBase }) {
        addBase(
          fonts.map((font) => ({
            '@font-face': {
              fontFamily,
              fontWeight: font.fontWeight,
              fontStyle: font.fontStyle,
              src: `url('${opts.fontBasePath}${font.url}') format('woff2')`,
              fontDisplay: 'swap',
            },
          })),
        );
      }),
    ],
    corePlugins: {
      container: false,
    },
    theme: {
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 28px
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
      },
      extend: {
        maxWidth: {
          // Override Tailwinds default prose width of 60 chars to 48. Roughly 590 pixels
          prose: '590px',
        },
        width: {
          prose: '590px',
        },
        screens: {
          // replicate the smaller than breakpoint from Windi. Even though we are mobile first, it is really nice with an escape hatch sometimes
          '<md': { max: '767.9px' },
        },
        spacing: {
          18: '4.5rem',
        },
        colors: {
          black: '#333',
          white: '#fff',
          gray: {
            // TODO: Figure out how to work this into the color scale
            concrete: '#f1f1f1',
            // Gray
            dark: '#595959',
            // Medium gray
            DEFAULT: '#818181',
            // Light gray
            light: '#E6E6E6',
          },
          blue: {
            // light blue
            lightest: '#DEEFF5',
            // OBOS Sky
            light: '#BEDFEC',
            // OBOS Blue/Primary brand
            DEFAULT: '#0047BA',
            // OBOS Ocean
            dark: '#002169',
          },
          green: {
            // light green
            lightest: '#E6F5F0',
            // OBOS Mint
            light: '#CDECE2',
            // OBOS Green/Primary brand
            DEFAULT: '#008761',
            // OBOS Forest
            dark: '#00524C',
          },
          red: {
            // error red
            light: '#faedef',
            DEFAULT: '#cd465e',
          },
          orange: {
            light: '#f8e5c9',
            DEFAULT: '#e8a74a',
          },
          yellow: {
            // open house
            DEFAULT: '#fff5d2',
          },
        },
        fontFamily: {
          sans: [fontFamily, 'sans-serif'],
        },
        boxShadow: {
          DEFAULT: '0 6px 4px 0 rgba(0, 33, 105, 0.25)',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              '--tw-prose-headings': theme('colors.black'),
              '--tw-prose-lead': theme('colors.black'),
              // TODO: Increase bullet size. See design sketches
              '--tw-prose-bullets': theme('colors.green.DEFAULT'),
              color: theme('colors.black'),
              maxWidth: theme('maxWidth.prose'),
              a: {
                fontWeight: 400,
              },
              h1: {
                fontWeight: 'bold',
              },
              h2: {
                fontWeight: 'bold',
              },
              h3: {
                fontWeight: 'bold',
              },
              h4: {
                fontWeight: 'bold',
              },
              li: {
                marginTop: '1.5em',
                marginBottom: '1.5em',
              },
              '[class~="lead"]': {
                fontWeight: 500,
              },
            },
          },
        }),
      },
    },
  };
};
