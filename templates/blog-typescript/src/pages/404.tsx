import Starlight, { Singleton, StarlightError } from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton, AboutSingleton } from "@/starlight";
import { useSearchContext } from "@/components/SearchContext";
import questionmark from "./_assets/questionmark.svg";
import { Button, Container } from "react-bootstrap";
import { Layout } from "@/components/Layout";
import { Title } from "@/components/Title";
import { Main } from "@/components/Main";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

type NotFoundProps = {
  header: Singleton<HeaderSingleton>;
  about: Singleton<AboutSingleton>;
  footer: Singleton<FooterSingleton>;
};

// TODO! NOT FOUND REDIRECTS

const InnerNotFound = () => {
  const { setIsSearchOpen } = useSearchContext();

  return (
    <>
      <div className="bg-brand-primary-50">
        <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
          <div className="d-flex flex-column gap-2 gap-md-4">
            <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
              Erro 404
            </p>
            <h1 className="m-0 fw-bold text-brand-primary-600">
              Página Não Encontrada
            </h1>
          </div>
        </Container>
      </div>
      <Main>
        <div className="d-flex flex-column gap-5 py-6 align-items-center">
          <Image src={questionmark} alt="search" />
          <div className="d-flex flex-column gap-3 align-items-center text-center">
            <h2 className="text-brand-primary-600 fw-bold m-0 lh-1">
              A página que você está tentando acessar não existe.
            </h2>
            <p className="text-brand-primary-800 fw-semibold m-0 fs-5 lh-1">
              Como você quer continuar?
            </p>
            <div className="d-flex flex-column flex-md-row gap-3">
              <Link href="/">
                <Button className="bg-brand-primary-400 border-brand-primary-400 fw-bold lh-4">
                  Ir para a página inicial
                </Button>
              </Link>
              <Button
                className="bg-brand-primary-400 border-brand-primary-400 fw-bold lh-4"
                onClick={() => setIsSearchOpen(true)}
              >
                Buscar conteúdo
              </Button>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

const NotFound = ({ header, about, footer }: NotFoundProps) => (
  <>
    <Title>Não Encontrado</Title>
    <Layout headerSingleton={header} footerSingleton={footer}>
      <InnerNotFound />
    </Layout>
  </>
);

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page is that it
// won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO! NOT-FOUND SINGLETON
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const aboutPromise = Starlight.singletons.get<AboutSingleton>("about");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, about, footer] = await Promise.all([
      headerPromise,
      aboutPromise,
      footerPromise,
    ]);

    return {
      // This "props" object is what our section component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        header: header.data,
        about: about.data,
        footer: footer.data,
      },
      revalidate: 15,
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

export default NotFound;
