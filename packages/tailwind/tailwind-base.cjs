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

module.exports = () => {
  const fontFamily = 'OBOSFont';
  const fonts = obosFonts;

  return {
    plugins: [
      plugin(function ({ addBase }) {
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
          '::selection': { '@apply bg-mint text-black': {} },
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
          DEFAULT: '#cd465e',
          // error red
          light: '#faedef',
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
      borderRadius: {
        none: '0',
        'x-small': '0.5rem',
        small: '1rem',
        medium: '1.5rem',
        large: '2rem',
        'x-large': '3rem',
        'xx-large': '3.5rem',
      },
    },
  };
};
