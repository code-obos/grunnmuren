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

/**
 * Styles for typography that are reused in both component classes and prose (through the tailwind typography plugin)
 */
const typography = {
  h1Text: {
    fontWeight: 'bold',
    small: {
      fontSize: '2.8125rem',
      lineHeight: '4.1875rem',
    },
    large: {
      fontSize: '3.9375rem',
      lineHeight: '5.9375rem',
    },
  },
  h2Text: {
    fontWeight: 'bold',
    small: {
      fontSize: '1.8125rem',
      lineHeight: '2.75rem',
    },
    large: {
      fontSize: '2.25rem',
      lineHeight: '3.5rem',
    },
  },
  h3Text: {
    fontWeight: 'bold',
    small: {
      fontSize: '1.4375rem',
      lineHeight: '2.25rem',
    },
    large: {
      fontSize: '1.625rem',
      lineHeight: '2.5625rem',
    },
  },
  h4Text: {
    fontWeight: 'medium',
    small: {
      fontSize: '1.1875rem',
      lineHeight: '1.1875rem',
    },
    large: {
      fontSize: '1.3125rem',
      lineHeight: '2.125rem',
    },
  },
  h5Text: {
    fontWeight: 'medium',
    small: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
    },
    large: {
      fontSize: '1.1875rem',
      lineHeight: '1.9375rem',
    },
  },
  h6Text: {
    fontWeight: 'bold',
    fontSize: '1rem', // 1rem is the base font size, which is obviously the default size. But it is set explicitly here to make it easier to configure in the future, if this size changes.
    lineHeight: '1.625rem',
  },
  bodyText: {
    fontSize: '1rem', // 1rem is the base font size, which is obviously the default size. But it is set explicitly here to make it easier to configure in the future, if this size changes.
    lineHeight: '1.625rem',
  },
  leadText: {
    fontWeight: 'medium',
    small: {
      fontSize: '1.4375rem',
      lineHeight: '2.25rem',
    },
    large: {
      fontSize: '1.625rem',
      lineHeight: '2.5625rem',
    },
  },
  blockquoteText: {
    small: {
      fontSize: '1rem', // 1rem is the base font size, which is obviously the default size. But it is set explicitly here to make it easier to configure in the future, if this size changes.
      lineHeight: '1.625rem',
    },
    large: {
      fontSize: '1rem', // 1rem is the base font size, which is obviously the default size. But it is set explicitly here to make it easier to configure in the future, if this size changes.
      lineHeight: '1.6875rem',
    },
    before: {
      // TODO: Use correct font for quote mark (font: OBOS Display)
      content: '"\\""',
      fontSize: '4.6875rem',
      lineHeight: '1.6875rem',
      fontWeight: 'bold',
    },
  },
  descriptionText: {
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.4375rem',
    },
    large: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
    },
  },
};

/**
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
        const {
          h1Text,
          h2Text,
          h3Text,
          h4Text,
          h5Text,
          h6Text,
          bodyText,
          leadText,
          blockquoteText,
          descriptionText,
        } = typography;

        // This is tailwind syntax for setting both the font-size and the line-height
        const h1 = `@apply font-${h1Text.fontWeight} text-[${h1Text.small.fontSize}]/[${h1Text.small.lineHeight}] md:text-[${h1Text.large.fontSize}]/[${h1Text.large.lineHeight}]`;
        const h2 = `@apply font-${h2Text.fontWeight} text-[${h2Text.small.fontSize}]/[${h2Text.small.lineHeight}] md:text-[${h2Text.large.fontSize}]/[${h2Text.large.lineHeight}]`;
        const h3 = `@apply font-${h3Text.fontWeight} text-[${h3Text.small.fontSize}]/[${h3Text.small.lineHeight}] md:text-[${h3Text.large.fontSize}]/[${h3Text.large.lineHeight}]`;
        const h4 = `@apply font-${h4Text.fontWeight} text-[${h4Text.small.fontSize}]/[${h4Text.small.lineHeight}] md:text-[${h4Text.large.fontSize}]/[${h4Text.large.lineHeight}]`;
        const h5 = `@apply font-${h5Text.fontWeight} text-[${h5Text.small.fontSize}]/[${h5Text.small.lineHeight}] md:text-[${h5Text.large.fontSize}]/[${h5Text.large.lineHeight}]`;
        const h6 = `@apply font-${h6Text.fontWeight} text-[${h6Text.fontSize}]/[${h6Text.lineHeight}]`;

        const body = `@apply text-[${bodyText.fontSize}]/[${bodyText.lineHeight}]`;
        const lead = `@apply font-medium text-[${leadText.small.fontSize}]/[${leadText.small.lineHeight}] md:text-[${leadText.large.fontSize}]/[${leadText.large.lineHeight}]`;

        // TODO: Use correct font for quote mark (font: OBOS Display)
        const blockquote = `@apply italic grid grid-cols-[32px_1fr] gap-x-[22px] pt-4
         text-[${blockquoteText.large.fontSize}]/[${blockquoteText.large.lineHeight}] md:text-[${blockquoteText.small.fontSize}]/[${blockquoteText.small.lineHeight}]
         before:text-[${blockquoteText.before.fontSize}]/[${blockquoteText.before.lineHeight}] before:font-${blockquoteText.before.fontWeight} before:content-[${blockquoteText.before.content}]`;

        const description = `@apply text-[${descriptionText.large.fontSize}]/[${descriptionText.large.lineHeight}] md:text-[${descriptionText.small.fontSize}]/[${descriptionText.small.lineHeight}]`;

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
          '.h5': {
            [h5]: {},
          },
          '.h6': {
            [h6]: {},
          },
          '.body': {
            [body]: {},
          },
          '.lead': {
            [lead]: {},
          },
          '.blockquote': {
            [blockquote]: {},
          },
          '.description': {
            [description]: {},
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
        sans: [fontFamily, 'sans-serif'],
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
              '--tw-prose-quotes': 'inherit',
              '--tw-prose-counters': theme('colors.black'),
              '--tw-prose-bullets': theme('colors.green.DEFAULT'),
              color: theme('colors.black'),
              maxWidth: theme('maxWidth.prose'),
              a: {
                fontWeight: 400,
              },
              h1: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h1Text.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.h1Text.large,
                },
              },
              h2: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h2Text.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.h2Text.large,
                },
              },
              h3: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h3Text.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.h3Text.large,
                },
              },
              h4: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h4Text.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.h4Text.large,
                },
              },
              h5: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h5Text.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.h5Text.large,
                },
              },
              h6: {
                fontWeight: theme('fontWeight.bold'),
                ...typography.h6Text,
              },
              li: {
                marginTop: '1.5em',
                marginBottom: '1.5em',
              },
              p: {
                ...typography.bodyText.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.bodyText.large,
                },
              },
              blockquote: {
                // Reset defaults:
                marginBottom: 'unset',
                padding: 'unset',
                border: 'unset',
                fontWeight: theme('fontWeight.normal'),
                fontStyle: 'italic',
                display: 'grid',
                gridTemplateColumns: '32px 1fr',
                columnGap: '22px',
                paddingTop: '1rem',
                ...typography.blockquoteText.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.blockquoteText.large,
                },
              },
              'blockquote::before': {
                // TODO: Use correct font for quote mark (font: OBOS Display)
                ...typography.blockquoteText.before,
              },
              '[class~="lead"]': {
                fontWeight: theme('fontWeight.medium'),
                ...typography.leadText.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.leadText.large,
                },
              },
              '[class~="description"]': {
                ...typography.descriptionText.small,
                '@media (min-width: theme("screens.md"))': {
                  ...typography.descriptionText.large,
                },
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
