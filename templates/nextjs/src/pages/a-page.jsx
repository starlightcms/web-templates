import Head from "next/head";
import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>A page — Next.js Boilerplate Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>A page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra
          et ligula non dapibus. Aliquam rhoncus, arcu in fermentum pharetra,
          lorem velit convallis eros, id egestas turpis magna in ex.
          Pellentesque in blandit orci. Ut ut mi nisi. Aenean id facilisis nisi.
          Aenean semper malesuada vulputate. Aliquam volutpat lectus sed nulla
          imperdiet pulvinar. Nunc in lacinia libero.
        </p>
        <p>
          Suspendisse porttitor justo tellus, ac bibendum tellus vulputate
          venenatis. Praesent faucibus suscipit elementum. Curabitur aliquet
          vitae massa in posuere. Fusce tincidunt vulputate nulla non euismod.
          Vestibulum cursus dapibus mollis. Sed tincidunt rhoncus odio, in
          consequat justo laoreet a. Ut porttitor suscipit congue. Etiam lacinia
          justo ex, sed bibendum sapien mollis vitae. Morbi consectetur ipsum
          leo, et scelerisque enim elementum ut. Pellentesque facilisis ipsum
          nec blandit scelerisque. Nulla viverra nulla eu metus aliquam auctor.
          Nunc in semper ex. Donec leo metus, porta ut facilisis vitae, rutrum
          sit amet risus. Fusce interdum pellentesque diam rutrum tempor.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Maecenas tincidunt nisl purus, a rutrum turpis
          auctor vitae. Ut velit massa, dapibus a quam ac, facilisis tristique
          lectus. In consectetur rutrum felis vitae dapibus. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Integer malesuada
          arcu id leo imperdiet pellentesque sed vel elit. Pellentesque molestie
          lacinia tortor eget luctus. Suspendisse tincidunt arcu nunc, eu dictum
          neque feugiat in. Suspendisse at elementum leo. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Donec in massa ligula. Phasellus
          vel malesuada justo. Praesent rutrum ultrices lectus a volutpat. Donec
          ante lacus, facilisis suscipit placerat sit amet, porttitor non neque.
          Sed auctor odio nisi, vel feugiat dui sodales vitae.
        </p>
        <p>
          Duis molestie pellentesque eros, quis lacinia lacus congue nec.
          Integer tincidunt sollicitudin fringilla. Pellentesque mi erat,
          pellentesque et eros et, maximus congue erat. Morbi lobortis, diam
          dignissim auctor maximus, leo sem vestibulum erat, ac condimentum quam
          libero a dolor. Vestibulum libero nibh, venenatis a diam sed,
          tincidunt volutpat libero. Mauris quis erat tellus. Cras sodales odio
          felis, eget blandit est pretium at. Sed vestibulum rhoncus egestas. In
          ultricies in nunc et commodo. Proin mollis ligula nulla, eu pulvinar
          nisi tempor vitae. Vivamus volutpat ex justo, ac placerat massa mollis
          ut. Integer maximus lectus eu sem sodales tristique. Etiam dolor
          justo, tincidunt in semper at, sodales eu nibh. Curabitur et odio
          sapien. Vestibulum est leo, rutrum in felis vitae, blandit fermentum
          arcu. Aenean luctus nibh purus, nec tincidunt risus varius nec.
        </p>
      </Layout>
    </>
  );
}
