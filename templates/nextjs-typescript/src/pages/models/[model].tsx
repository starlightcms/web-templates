import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Layout } from "@/components/Layout";
import Starlight, { Entry, Model } from "@starlightcms/next-sdk";
import Link from "next/link";
import styles from "@/styles/Models.module.css";

type ModelProps = {
  model: Model;
  entries: Entry<any>[];
};

export default function Model({ model, entries }: ModelProps) {
  return (
    <>
      <Head>
        <title>{`${model.title} — Next.js Boilerplate Template`}</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>{model.title}</h1>
        <Link href="/models">← Back to models</Link>
        <p>
          This is a list of entries of the <b>{model.title}</b> model. For the
          sake of simplicity, this list is not paginated, and only the last 15
          entries will be displayed. Click on any entry to see its details.
        </p>
        <p>
          <b>Tip</b>: take a look at this page's code at{" "}
          <code>src/pages/models/[model].tsx</code> to learn how to list
          entries.
        </p>
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.model}>
              <Link href={`/models/${model.slug}/${entry.slug}`}>
                {entry.title}
              </Link>
              <span>
                ↳ Created by {entry.author.name} • Published at{" "}
                {Intl.DateTimeFormat("en-US").format(
                  new Date(entry.published_at as string),
                )}
              </span>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

// This route receives one parameter: the slug of the model we want to view.
// This is why this file is named [model].tsx.
type ModelParams = {
  model: string;
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the current model and its latest entries.
export const getStaticProps: GetStaticProps<ModelProps, ModelParams> = async ({
  params,
}) => {
  // Use Promise.all() to make multiple requests in parallel.
  const [modelResponse, entriesResponse] = await Promise.all([
    // Get model information. This is only required to show
    // the model's title at the top of the page.
    Starlight.models.get(params?.model as string),
    // List the latest entries. By default, it returns the last 15 entries,
    // but you can change this by passing a configuration object to `.list()`.
    Starlight.model(params?.model as string).entries.list(),
  ]);

  return {
    props: {
      // Remember: the requested content will always be in the "data" property.
      model: modelResponse.data,
      entries: entriesResponse.data,
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
export const getStaticPaths: GetStaticPaths<ModelParams> = () => {
  return {
    // We don't need to generate any pages on build.
    paths: [],
    // New requests will wait for the HTML to be generated.
    fallback: "blocking",
  };
};
