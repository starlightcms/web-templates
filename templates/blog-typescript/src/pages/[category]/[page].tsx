import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton } from "@/starlight";
import { PopularArticles } from "@/components/PopularArticles";
import { ArticlesPage } from "@/components/ArticlesPage";
import { GetStaticPaths, GetStaticProps } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "@/components/Layout";
import { Title } from "@/components/Title";
import { Main } from "@/components/Main";
import { useRouter } from "next/router";

type CategoryPageProps = {
  header: Singleton<HeaderSingleton>;
  footer: Singleton<FooterSingleton>;
};

// TODO! DESCRIPTION
const CategoryPage = ({ header, footer }: CategoryPageProps) => {
  const router = useRouter();
  const { category, page } = router.query;

  const getUppercaseCategory = (category: string) => {
    return (
      category.charAt(0).toUpperCase() + category.slice(1).replaceAll("-", " ")
    );
  };

  // TODO! TITLE - GET CATEGORY NAME FROM STARLIGHT, UPPERCASE FUNCTION WONT BE NEEDED
  return (
    <>
      <Title>{`Category Title, página ${page}`}</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <div className="bg-brand-primary-50">
          <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
            {category !== "page" ? (
              <>
                <div className="d-flex flex-column gap-2">
                  <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
                    Category
                  </p>
                  <h1 className="m-0 fw-bold text-brand-primary-600 lh-1">
                    {getUppercaseCategory(category as string)}
                  </h1>
                  <span className="m-0 text-brand-primary-700 fs-5 lh-1">
                    Quis autem vel eum iure reprehenderit qui in ea voluptate
                    velit esse quam nihil molestiae consequatu.
                  </span>
                </div>
                <div className="bg-brand-secondary-200 px-3 py-2 align-self-start rounded-5">
                  <p className="m-0 text-brand-secondary-800 fw-bold">
                    800 articles
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
                  Category
                </p>
                <h1 className="m-0 fw-bold text-brand-primary-600 lh-1">
                  Latest Articles
                </h1>
              </>
            )}
          </Container>
        </div>
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-row flex-md-row">
            <Col sm={12} lg={8}>
              {/* // TODO! FIX CATEGORY AND LASTPAGE PROPS... */}
              <ArticlesPage
                label={`Page ${page as string}`}
                category={category as string}
                currentPage={parseInt(page as string)}
                lastPage={10}
              />
            </Col>
            <Col sm={12} lg={4}>
              <PopularArticles label="Most Popular" />
            </Col>
          </Row>
        </Main>
      </Layout>
    </>
  );
};

// TODO! COMMENT EXPLAINING
export const getStaticPaths: GetStaticPaths = async () => {
  // TODO! GET ALL CATEGORIES FROM STARLIGHT
  return {
    paths: [],
    fallback: "blocking",
  };
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page rather than in
// the individual sections is because it won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO! REDIRECT
  if (
    isNaN(parseInt(params?.page as string)) ||
    parseInt(params?.page as string) === 1
  ) {
    return {
      redirect: {
        destination: params?.category !== "page" ? `/${params?.category}` : "/",
        permanent: false,
      },
    };
  }

  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, footer] = await Promise.all([headerPromise, footerPromise]);

    return {
      // This "props" object is what our section component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        header: header.data,
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

export default CategoryPage;
