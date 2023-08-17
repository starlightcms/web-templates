import Head from "next/head";
import Link from "next/link";
import Starlight, { StarlightError } from "@starlightcms/next-sdk";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Models.module.css";

export default function Models({ models }) {
  return (
    <>
      <Head>
        <title>Models — Next.js Boilerplate Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Models</h1>
        <p>
          Models in your workspace are listed below, click on their name to
          check out a list of its entries. For the sake of simplicity, this list
          is not paginated and limited to 10 models, ordered by creation date.
        </p>
        <p>
          <b>Tip</b>: take a look at this page&apos;s code at{" "}
          <code>src/pages/models.tsx</code> to learn how to list models.
        </p>
        {models.length ? (
          <ul className={styles.list}>
            {models.map((model) => (
              <li key={model.id} className={styles.model}>
                <Link href={`/models/${model.slug}`}>{model.title}</Link>
                <span>
                  ↳ {model.entry_count}{" "}
                  {model.entry_count === 1 ? "entry" : "entries"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <b>No models found in the current workspace.</b> Create at least one
            model and refresh this page.
          </p>
        )}
      </Layout>
    </>
  );
}

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the list of models in the configured workspace.
export const getServerSideProps = async () => {
  try {
    // Notice the "await": all Starlight SDK methods return Promises.
    const response = await Starlight.models.list();

    return {
      // This "props" object is what our page component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        models: response.data,
      },
    };
  } catch (e) {
    if (e instanceof StarlightError) {
      throw new Error(
        "The Starlight SDK threw an error. Please check if you correctly set " +
          "the NEXT_PUBLIC_STARLIGHT_WORKSPACE environment variable with a " +
          "workspace ID. Original error message: " +
          e.message,
      );
    }

    // Not an SDK error, just throw it again.
    throw e;
  }
};
