import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import { Layout } from "@/components/Layout";
import Head from "next/head";
import { HeaderSingleton, HeroSingleton, FooterSingleton } from "@/starlight";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import ArticlePage from "@/components/ArticlePage";
import PopularArticles from "@/components/PopularArticles";

type CategoryProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  footer: Singleton<FooterSingleton>;
};

export default function Category({ header, hero, footer }: CategoryProps) {
  const router = useRouter();
  const { category } = router.query;

  const getUppercaseCategory = (category: string) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
    );
  };

  // TODO! TITLE - ALSO, GET CATEGORY NAME FROM STARLIGHT, UPPERCASE FUNCTION WONT BE NEEDED
  return (
    <>
      <Head>
        <title>Blog Template</title>
      </Head>
      <div className="bg-brand-primary-50">
        <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
          <div className="d-flex flex-column gap-2">
            <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
              Category
            </p>
            <h1 className="m-0 fw-bold text-brand-primary-600">
              {getUppercaseCategory(category as string)}
            </h1>
            <span className="m-0 text-brand-primary-700 fs-5 lh-1">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatu.
            </span>
          </div>
          <div className="bg-brand-secondary-200 px-3 py-2 align-self-start rounded-5">
            <p className="m-0 text-brand-secondary-800 fw-bold">800 articles</p>
          </div>
        </Container>
      </div>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <Row className="gx-6 gy-6 d-flex flex-row flex-md-row">
          <Col sm={12} lg={8}>
            {/* // TODO! FIX CATEGORY AND LASTPAGE PROPS... */}
            <ArticlePage
              label="Page 2"
              category={category as string}
              currentPage={1}
              lastPage={10}
            />
          </Col>
          <Col sm={12} lg={4}>
            <PopularArticles label="Most Popular" />
          </Col>
        </Row>
      </Layout>
    </>
  );
}

// TODO! COMMENT EXPLAINING
export const getStaticPaths: GetStaticPaths = async () => {
  // TODO! GET ALL CATEGORIES FROM STARLIGHT
  return {
    paths: ["/tech", "/science", "/entertainment"],
    fallback: "blocking",
  };
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page rather than in
// the individual sections is because it won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.category === "page") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const heroPromise = Starlight.singletons.get<HeroSingleton>("hero");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, hero, footer] = await Promise.all([
      headerPromise,
      heroPromise,
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
        hero: hero.data,
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
