const plugin = require('tailwindcss/plugin');

const obosFonts = [
  {
    fontWeight: 400,
    fontStyle: 'normal',
    url: 'https://www.obos.no/fonts/OBOSText-Regular.woff2',
  },
  {
    fontWeight: 400,
    fontStyle: 'italic',
    url: 'https://www.obos.no/fonts/OBOSText-Italic.woff2',
  },
  {
    fontWeight: 500,
    fontStyle: 'normal',
    url: 'https://www.obos.no/fonts/OBOSText-Medium.woff2',
  },
  {
    fontWeight: 700,
    fontStyle: 'normal',
    url: 'https://www.obos.no/fonts/OBOSText-Bold.woff2',
  },
];

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

module.exports = () => {
  const fontFamily = 'OBOSFont';
  const fonts = obosFonts;
  const containerSize = '92rem';

  return {
    plugins: [
      // TODO: Remove the aspect ratio plugin when Safari 14 usage is low enough
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/typography'),
      headings,
      plugin(function ({ addBase, addComponents, theme }) {
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
          '::selection': { '@apply bg-mint text-black': {} },
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
            maxWidth: '45.5rem',
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

          '.page-layout': {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
          '.page-layout-main': {
            backgroundColor: '#fff',
            flexGrow: '1',
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
              src: `url('${font.url}') format('woff2')`,
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
          prose: '696px',
        },
        width: {
          prose: '696px',
        },
        spacing: {
          18: '4.5rem',
        },
        colors: {
          black: '#333',
          white: '#fff',
          gray: {
            // Dark Gray
            dark: '#595959',
            // gray
            DEFAULT: '#818181',
            // Light gray
            light: '#E6E6E6',
            // Lightest gray
            lightest: '#f1f1f1',
          },
          sky: {
            DEFAULT: '#BEDFEC',
            light: '#DEEFF5',
            lightest: '#EBF5F9',
          },
          mint: {
            DEFAULT: '#CDECE2',
            light: '#E6F5F0',
            lightest: '#F0F9F6',
          },
          blue: {
            lightest: '#DEEFF5',
            light: '#BEDFEC',

            // OBOS Blue/Primary brand
            DEFAULT: '#0047BA',
            // OBOS Ocean
            dark: '#002169',
          },
          green: {
            lightest: '#E6F5F0',
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
        borderColor: ({ theme }) => ({
          DEFAULT: theme('colors.gray.light', 'currentColor'),
        }),
        fontFamily: {
          sans: [fontFamily, 'sans-serif'],
        },
        boxShadow: {
          DEFAULT: '0 6px 4px 0 rgba(0, 33, 105, 0.25)',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              '--tw-prose-headings': 'inherit',
              '--tw-prose-lead': 'inherit',
              '--tw-prose-links': 'inherit',
              '--tw-prose-quotes': theme('colors.blue.dark'),
              '--tw-prose-quote-borders': theme('colors.green.DEFAULT'),
              '--tw-prose-counters': theme('colors.black'),
              // TODO: Increase bullet size. See design sketches
              '--tw-prose-bullets': theme('colors.green.DEFAULT'),
              color: theme('colors.black'),
              maxWidth: theme('maxWidth.prose'),
              a: {
                fontWeight: 400,
              },
              h1: {
                fontWeight: theme('fontWeight.bold'),
                fontSize: theme('fontSize.3xl'),
                '@media (min-width: theme("screens.md"))': {
                  fontSize: theme('fontSize.5xl'),
                },
              },
              h2: {
                fontWeight: theme('fontWeight.bold'),
                fontSize: theme('fontSize.2xl'),
                '@media (min-width: theme("screens.md"))': {
                  fontSize: theme('fontSize.4xl'),
                },
              },
              h3: {
                fontWeight: theme('fontWeight.bold'),
                fontSize: theme('fontSize.xl'),
                '@media (min-width: theme("screens.md"))': {
                  fontSize: theme('fontSize.2xl'),
                },
              },
              h4: {
                fontWeight: theme('fontWeight.bold'),
                fontSize: theme('fontSize.lg'),
                '@media (min-width: theme("screens.md"))': {
                  fontSize: theme('fontSize.xl'),
                },
              },
              li: {
                marginTop: '1.5em',
                marginBottom: '1.5em',
              },
              blockquote: {
                fontWeight: theme('fontWeight.bold'),
                fontStyle: 'normal',
              },
              'blockquote p:first-of-type::before': {
                content: '"«"',
              },
              'blockquote p:last-of-type::after': {
                content: '"»"',
              },
              '[class~="lead"]': {
                fontWeight: theme('fontWeight.medium'),
              },
            },
          },
        }),
      },
    },
  };
};
