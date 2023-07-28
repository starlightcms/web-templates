import Head from "next/head";
import { Layout } from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Boilerplate Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <figure className={styles.figure}>
          <a href="https://starlight.sh" target="_blank">
            <Image
              src="/starlight.svg"
              alt="Starlight Logo"
              width={187}
              height={40}
            />
          </a>
          <div className={styles.figureDivider} />
          <a href="#" target="_blank">
            <Image
              src="/web-templates.svg"
              alt="Web Templates Logo"
              width={264}
              height={40}
            />
          </a>
        </figure>
        <div className={styles.content}>
          <h1>Next.js Boilerplate</h1>
          <p>
            You’ve just set up a brand new web application using the{" "}
            <b>Next.js Boilerplate</b> template. This template includes a
            pre-configured <b>Starlight SDK</b> instance.
          </p>
          <div className={styles.instructions}>
            <p>
              Get started by editing <code>src/pages/index.tsx</code>.
            </p>
            <span>OR</span>
            <p>
              Learn more by reading the included <code>README.md</code> file.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}
