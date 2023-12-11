import { ReactNode } from "react";
import Head from "next/head";

type TitleProps = {
  children: ReactNode;
};

/**
 * Doesn't render anything, but simplifies the process of creating the page
 * title and adds a suffix (" — Web Templates") to all titles.
 */
export const Title = ({ children }: TitleProps) => (
  <Head>
    <title>{children} — Web Templates</title>
  </Head>
);
