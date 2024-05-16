const plugin = require('tailwindcss/plugin');
const fontFallback = require('./fonts/font-fallback');

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

/**
 * @param {boolean} options.includeFontDeclarations
 * @param {boolean} options.includeFontFallback
 * @param {boolean} options.legacyV1Compatibility
 */
module.exports = (options = {}) => {
  const v1CompatibilityPlugins = [];

  if (options.legacyV1Compatibility) {
    v1CompatibilityPlugins.push(
      button,
      checkbox,
      radio,
      snackbar,
      require('@tailwindcss/aspect-ratio'),
    );
  }

  const fontFamily = 'OBOSFont';
  const fonts = obosFonts;
  const containerSize = '92rem';

  return {
    plugins: [
      ...v1CompatibilityPlugins,
      require('@tailwindcss/typography'),
      require('tailwindcss-animate'),
      plugin(function ({ addBase, addComponents }) {
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
            'text-decoration': 'underline',
          },
          '::selection': { '@apply bg-mint text-black': {} },
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
        });
      }),

      plugin(function ({ addBase, addComponents }) {
        // This is tailwind syntax for setting both the font-size and the line-height
        const h1 = '@apply font-bold text-[28px]/[38px] md:text-[40px]/[56px]';
        const h2 = '@apply font-bold text-[24px]/[30px] md:text-[32px]/[42px]';
        const h3 = '@apply font-bold text-[20px]/[30px] md:text-[24px]/[34px]';
        const h4 = '@apply font-bold text-[18px]/[24px] md:text-[20px]/[28px]';

        if (options.legacyV1Compatibility) {
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
        }

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
      }),
      plugin(function ({ addBase }) {
        if (options.includeFontDeclarations) {
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

            addBase({
              '@font-face': fontFallback,
            }),
          );
        }
      }),
    ],
    theme: {
      colors: {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        black: '#333',
        white: '#fff',
        gray: {
          DEFAULT: '#818181',
          dark: '#595959',
          light: '#E6E6E6',
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
          // OBOS Blue/Primary brand
          DEFAULT: '#0047BA',
          light: '#BEDFEC',
          lightest: '#DEEFF5',
          // OBOS Ocean
          dark: '#002169',
        },
        green: {
          // OBOS Green/Primary brand
          DEFAULT: '#008761',
          lightest: '#E6F5F0',
          light: '#CDECE2',
          // OBOS Forest
          dark: '#00524C',
        },
        red: {
          DEFAULT: '#C0385D',
          // error red
          light: '#FAEDEF',
        },
        orange: {
          DEFAULT: '#e8a74a',
          light: '#f8e5c9',
        },
        yellow: {
          // open house
          DEFAULT: '#fff5d2',
        },
      },
      fontFamily: {
        sans: [
          fontFamily,
          options.includeFontFallback && fontFallback['font-family'],
          'sans-serif',
        ].filter(),
      },
      extend: {
        maxWidth: {
          // Override Tailwinds default prose width of 60 chars.
          prose: '696px',
        },
        width: {
          prose: '696px',
        },
        spacing: {
          18: '4.5rem',
        },
        borderColor: options.legacyV1Compatibility
          ? ({ theme }) => ({
              DEFAULT: theme('colors.gray.light', 'currentColor'),
            })
          : undefined,
        typography: (theme) => ({
          DEFAULT: {
            css: {
              '--tw-prose-headings': 'inherit',
              '--tw-prose-lead': 'inherit',
              '--tw-prose-links': 'inherit',
              '--tw-prose-quotes': theme('colors.blue.dark'),
              '--tw-prose-quote-borders': theme('colors.green.DEFAULT'),
              '--tw-prose-counters': theme('colors.black'),
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

// These custom components are only used for v1 compat
const button = plugin(function ({ addComponents, theme }) {
  const hoverLoadingBgColor = 'rgba(0, 0, 0, 0.1)';

  addComponents({
    '.button': {
      // The Tailwind utilities we use for focus styling are kinda hard to "translate", so using the @apply utility here, even though mixing styles are meh...
      '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-black ring-offset-2':
        {},
      position: 'relative',
      textDecorationLine: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme('spacing.3'),
      border: '2px solid',
      padding: `${theme('spacing.2')} ${theme('spacing.6')}`,
      borderRadius: '0.75rem',
      transition: `all 200ms ${theme('transitionTimingFunction.DEFAULT')}`,
      fontWeight: theme('fontWeight.medium'),
      width: 'fit-content',
      '&:disabled': {
        backgroundColor: theme('colors.gray.light'),
        borderColor: theme('colors.gray.light'),
        color: theme('colors.black'),
        pointerEvents: 'none',
      },
      '&:hover': {
        borderRadius: '0.375rem',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: 'transparent',
        display: 'block',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        borderRadius: 'inherit',
      },
      // adds a shade on the button when hovered
      // ideally this would be solved by just darkening the button background,
      // but that doesn't really work since some of the button variations have transparent backgrounds
      '&:hover::after': {
        backgroundColor: hoverLoadingBgColor,
        transition: `all 200ms ${theme('transitionTimingFunction.DEFAULT')}`,
      },
      // We use aria-busy to indicate loading state
      '&[aria-busy="true"] > *': {
        visibility: 'hidden',
      },
      '&[aria-busy="true"]::after': {
        backgroundColor: hoverLoadingBgColor,
      },
    },
  });
});

const radio = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.radio': {
      // hide the native radio input
      appearance: 'none',
      // not removed via appeareance
      margin: 0,
      height: '1.25rem',
      width: '1.25rem',
      borderRadius: '50%',
      border: `2px solid ${theme('colors.gray.dark')}`,
      cursor: 'pointer',
      // use grid to handle the checked:before styles
      display: 'inline-grid',
      placeContent: 'center',
      // Prevent flex container from altering the size of the radio button
      flex: '0 0 auto',
      // magic number that tries to keep the input horizontally centered in relation to the first line of the label text
      transform: 'translateY(0.095em)',
      '&:checked': {
        borderColor: theme('colors.green.DEFAULT'),
      },
      '&:focus-visible': {
        outline: '1px solid currentColor',
        outlineOffset: '4px',
      },
      '&::before': {
        content: '""',
        display: 'block',
        borderRadius: '50%',
        transform: 'scale(0)',
        width: '0.65em',
        height: '0.65em',
        transition: '120ms transform ease-in-out',
        boxShadow: `inset 1em 1em ${theme('colors.green.DEFAULT')}`,
        /* Windows High Contrast Mode */
        backgroundColor: 'CanvasText',
      },
      '&:checked::before': {
        transform: 'scale(1)',
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
