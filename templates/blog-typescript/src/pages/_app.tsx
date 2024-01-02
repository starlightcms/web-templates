import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Starlight from "@starlightcms/next-sdk";
import "@/styles/customBootstrap.scss";
import Head from "next/head";

/**
 * Initialize the Starlight SDK. You must place the ID of the workspace you want to
 * request data from in the NEXT_PUBLIC_STARLIGHT_WORKSPACE environment variable.
 * You can use the .env.example file in the root of your project as a starting point.
 *
 * Next.js documentation on environment variables:
 * https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
 */
Starlight.configure({
  workspace: process.env.NEXT_PUBLIC_STARLIGHT_WORKSPACE,
});

/**
 * We'll use Inter as the default font family.
 *
 * Next.js documentation on custom fonts:
 * https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
 */
const inter = Inter({ subsets: ["latin"] });

export const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default App;
