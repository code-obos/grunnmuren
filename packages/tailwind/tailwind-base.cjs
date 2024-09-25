const plugin = require('tailwindcss/plugin');
const fontFallbacks = require('./fonts/font-fallback');

const fontDeclarations = {
  OBOSText: [
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
  ],
  OBOSDisplay: [
    {
      url: 'https://www.obos.no/fonts/OBOSDisplay-SemiBold.woff2',
    },
  ],
};

/**
 * Styles for typography that are reused in both component classes and prose (through the tailwind typography plugin)
 */
const typography = {
  headingXlText: {
    fontWeight: 'semibold',
    small: {
      fontSize: '2.8125rem',
      lineHeight: '3.625rem',
    },
    large: {
      fontSize: '3.9375rem',
      lineHeight: '5.125rem',
    },
  },
  headingLText: {
    fontWeight: 'semibold',
    small: {
      fontSize: '1.8125rem',
      lineHeight: '2.75rem',
    },
    large: {
      fontSize: '2.25rem',
      lineHeight: '3.5rem',
    },
  },
  headingMText: {
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
  headingSText: {
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
  headingXsText: {
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
  paragraphText: {
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
    fontWeight: 'medium',
    display: 'grid',
    gridTemplateColumns: '3rem 1fr',
    columnGap: '0.4375rem',
    small: {
      fontSize: '1.4375rem',
      lineHeight: '2.25rem',
    },
    large: {
      fontSize: '1.625rem',
      lineHeight: '2.5625rem',
    },
    before: {
      content: '"“"',
      fontFamily: 'OBOSDisplay',
      fontSize: '4.6875rem',
      lineHeight: '1.6875rem',
      fontWeight: '400',
      fontStyle: 'normal',
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
 * @param {boolean} options.includeFontFallback
 * @param {boolean} options.legacyV1Compatibility
 */
module.exports = (options = {}) => {
  options.includeFontFallback ??= true;
  options.legacyV1Compatibility ??= false;

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

  return {
    plugins: [
      ...v1CompatibilityPlugins,
      require('@tailwindcss/typography'),
      require('tailwindcss-animate'),
      plugin(function ({ addBase, addComponents, theme }) {
        addBase({
          html: {
            '@apply text-black antialiased font-normal font-text': {},
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
          ':root': {
            '--gm-container-width': '92rem',
            '--gm-container-gutter-width': '1rem',

            '--gm-color-black': '#333',
            '--gm-color-white': '#fff',

            '--gm-color-gray': '#818181',
            '--gm-color-gray-dark': '#595959',
            '--gm-color-gray-light': '#e6e6e6',
            '--gm-color-gray-lightest': '#f1f1f1',

            '--gm-color-sky': '#bedfec',
            '--gm-color-sky-light': '#deeff5',
            '--gm-color-sky-lightest': '#ebf5f9',

            '--gm-color-mint': '#cdece2',
            '--gm-color-mint-light': '#e6f5f0',
            '--gm-color-mint-lightest': '#f0f9f6',

            '--gm-color-blue': '#0047ba',
            '--gm-color-blue-light': '#bedfec',
            '--gm-color-blue-lightest': '#deeff5',
            '--gm-color-blue-dark': '#002169',

            '--gm-color-green': '#008761',
            '--gm-color-green-dark': '#00524c',
            '--gm-color-green-light': '#cdece2',
            '--gm-color-green-lightest': '#e6f5f0',

            '--gm-color-red': '#c0385d',
            '--gm-color-red-light': '#faedef',

            '--gm-color-orange': '#e8a74a',
            '--gm-color-orange-light': '#f8e5c9',

            '--gm-color-yellow': '#fff5d2',
          },
        });

        addComponents({
          '.page-layout': {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
          '.page-layout-main': {
            backgroundColor: theme('colors.white'),
            flexGrow: '1',
          },
          '.container': {
            width: '100%',
            paddingLeft: 'var(--gm-container-gutter-width)',
            paddingRight: 'var(--gm-container-gutter-width)',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 'var(--gm-container-width)',
          },
          '.container-prose': {
            width: '100%',
            paddingLeft: 'var(--gm-container-gutter-width)',
            paddingRight: 'var(--gm-container-gutter-width)',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '45.5rem',
          },
        });
      }),

      plugin(function ({ addBase, addComponents }) {
        const {
          headingXlText,
          headingLText,
          headingMText,
          headingSText,
          headingXsText,
          paragraphText,
          leadText,
          blockquoteText,
          descriptionText,
        } = typography;

        // This is tailwind syntax for setting both the font-size and the line-height
        const headingXl = `@apply font-display font-${headingXlText.fontWeight} text-[${headingXlText.small.fontSize}]/[${headingXlText.small.lineHeight}] lg:text-[${headingXlText.large.fontSize}]/[${headingXlText.large.lineHeight}]`;
        const headingL = `@apply font-display font-${headingLText.fontWeight} text-[${headingLText.small.fontSize}]/[${headingLText.small.lineHeight}] lg:text-[${headingLText.large.fontSize}]/[${headingLText.large.lineHeight}]`;
        const headingM = `@apply font-text font-${headingMText.fontWeight} text-[${headingMText.small.fontSize}]/[${headingMText.small.lineHeight}] lg:text-[${headingMText.large.fontSize}]/[${headingMText.large.lineHeight}]`;
        const headingS = `@apply font-text font-${headingSText.fontWeight} text-[${headingSText.small.fontSize}]/[${headingSText.small.lineHeight}] lg:text-[${headingSText.large.fontSize}]/[${headingSText.large.lineHeight}]`;
        const headingXs = `@apply font-text font-${headingXsText.fontWeight} text-[${headingXsText.small.fontSize}]/[${headingXsText.small.lineHeight}] lg:text-[${headingXsText.large.fontSize}]/[${headingXsText.large.lineHeight}]`;

        const paragraph = `@apply text-[${paragraphText.fontSize}]/[${paragraphText.lineHeight}]`;
        const lead = `@apply font-medium text-[${leadText.small.fontSize}]/[${leadText.small.lineHeight}] lg:text-[${leadText.large.fontSize}]/[${leadText.large.lineHeight}]`;

        const blockquote = `@apply font-${blockquoteText.fontWeight} italic grid grid-cols-[${blockquoteText.gridTemplateColumns.split(' ').join('_')}] gap-x-[${blockquoteText.columnGap}] pt-4
         text-[${blockquoteText.large.fontSize}]/[${blockquoteText.large.lineHeight}] lg:text-[${blockquoteText.small.fontSize}]/[${blockquoteText.small.lineHeight}]
         before:text-[${blockquoteText.before.fontSize}]/[${blockquoteText.before.lineHeight}] before:content-[${blockquoteText.before.content}] before:font-display before:not-italic`;

        const description = `@apply text-[${descriptionText.large.fontSize}]/[${descriptionText.large.lineHeight}] lg:text-[${descriptionText.small.fontSize}]/[${descriptionText.small.lineHeight}]`;

        if (options.legacyV1Compatibility) {
          addBase({
            h1: {
              [headingXl]: {},
            },
            h2: {
              [headingL]: {},
            },
            h3: {
              [headingM]: {},
            },
            h4: {
              [headingS]: {},
            },
          });
        }

        addComponents({
          /** @deprecated Will be replaced by heading-xl */
          '.h1': {
            [headingXl]: {},
          },
          /** @deprecated Will be replaced by heading-l */
          '.h2': {
            [headingL]: {},
          },
          /** @deprecated Will be replaced by heading-m */
          '.h3': {
            [headingM]: {},
          },
          /** @deprecated Will be replaced by heading-s */
          '.h4': {
            [headingS]: {},
          },
          '.heading-xl': {
            [headingXl]: {},
          },
          '.heading-l': {
            [headingL]: {},
          },
          '.heading-m': {
            [headingM]: {},
          },
          '.heading-s': {
            [headingS]: {},
          },
          '.heading-xs': {
            [headingXs]: {},
          },
          '.paragraph': {
            [paragraph]: {},
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
          Object.entries(fontDeclarations).flatMap(
            ([fontFamily, fontFamilyDeclarations]) =>
              fontFamilyDeclarations.map((font) => ({
                '@font-face': {
                  fontFamily,
                  fontWeight: font.fontWeight,
                  fontStyle: font.fontStyle,
                  src: `url('${font.url}') format('woff2')`,
                  fontDisplay: 'swap',
                },
              })),
          ),
        );

        if (options.includeFontFallback) {
          addBase(
            Object.values(fontFallbacks).map((fontFallback) => ({
              '@font-face': fontFallback,
            })),
          );
        }
      }),
    ],
    theme: {
      colors: {
        inherit: 'inherit',
        current: 'currentColor',
        transparent: 'transparent',
        black: 'var(--gm-color-black)',
        white: 'var(--gm-color-white)',
        gray: {
          DEFAULT: 'var(--gm-color-gray)',
          dark: 'var(--gm-color-gray-dark)',
          light: 'var(--gm-color-gray-light)',
          lightest: 'var(--gm-color-gray-lightest)',
        },
        sky: {
          DEFAULT: 'var(--gm-color-sky)',
          light: 'var(--gm-color-sky-light)',
          lightest: 'var(--gm-color-sky-lightest)',
        },
        mint: {
          DEFAULT: 'var(--gm-color-mint)',
          light: 'var(--gm-color-mint-light)',
          lightest: 'var(--gm-color-mint-lightest)',
        },
        blue: {
          // OBOS Blue/Primary brand
          DEFAULT: 'var(--gm-color-blue)',
          // OBOS Ocean
          dark: 'var(--gm-color-blue-dark)',
          light: 'var(--gm-color-blue-light)',
          lightest: 'var(--gm-color-blue-lightest)',
        },
        green: {
          // OBOS Green/Primary brand
          DEFAULT: 'var(--gm-color-green)',
          // OBOS Forest
          dark: 'var(--gm-color-green-dark)',
          light: 'var(--gm-color-green-light)',
          lightest: 'var(--gm-color-green-lightest)',
        },
        red: {
          DEFAULT: 'var(--gm-color-red)',
          // error red
          light: 'var(--gm-color-red-light)',
        },
        orange: {
          DEFAULT: 'var(--gm-color-orange)',
          light: 'var(--gm-color-orange-light)',
        },
        yellow: {
          // open house
          DEFAULT: 'var(--gm-color-yellow)',
        },
      },
      fontFamily: {
        text: [
          'OBOSText',
          options.includeFontFallback && fontFallbacks.OBOSText['font-family'],
          'sans-serif',
        ].filter((f) => f),
        display: [
          'OBOSDisplay',
          options.includeFontFallback &&
            fontFallbacks.OBOSDisplay['font-family'],
          'sans-serif',
        ],
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
              '--tw-prose-bullets': theme('colors.black'),
              color: theme('colors.black'),
              maxWidth: theme('maxWidth.prose'),
              a: {
                fontWeight: 400,
              },
              h1: {
                fontFamily: 'OBOSDisplay',
                fontWeight: theme('fontWeight.semibold'),
                ...typography.headingXlText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.headingXlText.large,
                },
              },
              h2: {
                fontFamily: 'OBOSDisplay',
                fontWeight: theme('fontWeight.semibold'),
                ...typography.headingLText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.headingLText.large,
                },
              },
              h3: {
                fontFamily: 'OBOSText',
                fontWeight: theme('fontWeight.medium'),
                ...typography.headingMText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.headingMText.large,
                },
              },
              h4: {
                fontFamily: 'OBOSText',
                fontWeight: theme('fontWeight.medium'),
                ...typography.headingSText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.headingSText.large,
                },
              },
              h5: {
                fontFamily: 'OBOSText',
                fontWeight: theme('fontWeight.bold'),
                ...typography.headingXsText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.headingXsText.large,
                },
              },
              li: {
                ...typography.paragraphText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.paragraphText.large,
                },
              },
              p: {
                ...typography.paragraphText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.paragraphText.large,
                },
              },
              blockquote: {
                // Reset defaults:
                marginBottom: 'unset',
                padding: 'unset',
                border: 'unset',
                fontWeight: theme('fontWeight.medium'),
                fontStyle: 'italic',
                display: typography.blockquoteText.display,
                gridTemplateColumns:
                  typography.blockquoteText.gridTemplateColumns,
                columnGap: typography.blockquoteText.columnGap,
                paddingTop: '1rem',
                ...typography.blockquoteText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.blockquoteText.large,
                },
              },
              'blockquote::before': {
                ...typography.blockquoteText.before,
              },
              '[class~="lead"]': {
                fontWeight: theme('fontWeight.medium'),
                ...typography.leadText.small,
                '@media (min-width: theme("screens.lg"))': {
                  ...typography.leadText.large,
                },
              },
              '[class~="description"]': {
                ...typography.descriptionText.small,
                '@media (min-width: theme("screens.lg"))': {
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
