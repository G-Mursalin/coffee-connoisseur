import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content="A coffee connoisseur is someone who knows everything about the drink. You know the different roasts. You know the different types of beans (and where they come from)."
          key="title"
        />
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Bold.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="preload"
          href="/fonts/IBMPlexSans-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
