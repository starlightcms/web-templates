import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/Layout";
import Starlight, { Entry } from "@starlightcms/next-sdk";
import styles from "@/styles/Models.module.css";

type EntryProps = {
  entry: Entry<any>;
};

export default function Entry({ entry }: EntryProps) {
  return (
    <>
      <Head>
        <title>{`${entry.title} — Next.js Boilerplate Template`}</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>{entry.title}</h1>
        <Link href={`/models/${entry.model?.slug}`}>← Back to entries</Link>
        <p>
          Since this template is generic, it wouldn't know how you want to
          render this entry's content. However, you can find its JSON
          representation below. This is the exact JSON returned by Starlight's
          Query API.
        </p>
        <p>
          <b>Tip</b>: take a look at this page's code at{" "}
          <code>src/pages/models/[model]/[entry].tsx</code> to learn how to
          request entries.
        </p>
        <p>
          <b>Another tip</b>: if your model has a Visual Editor field, its
          content below will show up as an object. The Starlight SDK provides a
          React component that renders this object as HTML for you. You can
          learn more about it reading{" "}
          <a
            href="https://react.sdk.starlight.sh/docs/components/VisualContent/"
            target="_blank"
          >
            this documentation page
          </a>
          .
        </p>
        <pre className={styles.json}>{JSON.stringify(entry, null, 4)}</pre>
      </Layout>
    </>
  );
}

// This route receives two parameters: the slug of the entry we want to view and
// the slug of its model. This is why this file is named [model]/[entry].tsx.
type EntryParams = {
  model: string;
  entry: string;
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the current model and its latest entries.
export const getStaticProps: GetStaticProps<EntryProps, EntryParams> = async ({
  params,
}) => {
  const response = await Starlight.model(params?.model as string).entries.get(
    params?.entry as string,
  );

  return {
    props: {
      // Remember: the requested content will always be in the "data" property.
      entry: response.data,
    },
    /**
     * This page is static, that is, it'll be rendered once at build time.
     * On production, however, Next.js will attempt to regenerate this page:
     * - When a request comes in;
     * - At most once every 15 seconds.
     *
     * See how static regeneration works: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration
     */
    revalidate: 15,
  };
};

/**
 * Since we're using `getStaticProps` with a dynamic route (because of the
 * [model] parameter), we need to provide a `getStaticPaths` function.
 *
 * Learn more at: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths
 */
export const getStaticPaths: GetStaticPaths<EntryParams> = () => {
  return {
    // We don't need to generate any pages on build.
    paths: [],
    // New requests will wait for the HTML to be generated.
    fallback: "blocking",
  };
};
