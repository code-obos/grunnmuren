import localFont from 'next/font/local';

export const OBOSFont = localFont({
  src: [
    {
      path: './OBOSText-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './OBOSText-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './OBOSText-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './OBOSText-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-obos',
  fallback: ['Helvetica', 'ui-sans-serif'],
});
