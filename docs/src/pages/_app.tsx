import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Grunnmuren | OBOS Design System</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
