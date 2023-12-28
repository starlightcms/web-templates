import Starlight, {
  Entry,
  ModelCategory,
  Singleton,
  StarlightError,
  StarlightListResponse,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton, Article } from "@/starlight";
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
  articles: StarlightListResponse<Entry<Article>>;
  category: ModelCategory | null;
  popular: Entry<Article>[];
  footer: Singleton<FooterSingleton>;
};

const CategoryPage = ({
  header,
  articles,
  category,
  popular,
  footer,
}: CategoryPageProps) => {
  const router = useRouter();
  const { category: routerCategory, page } = router.query;

  return (
    <>
      <Title>{`${
        routerCategory !== "page" ? category?.title : "Artigos Mais Recentes"
      } — Página ${page}`}</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <div className="bg-brand-primary-50">
          <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
            {routerCategory !== "page" ? (
              <>
                <div className="d-flex flex-column gap-2 gap-md-4">
                  <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
                    Categoria
                  </p>
                  <h1 className="m-0 fw-bold text-brand-primary-600 lh-1">
                    {category?.title}
                  </h1>
                </div>
                <div className="bg-brand-secondary-200 px-3 py-2 align-self-start rounded-5">
                  <p className="m-0 text-brand-secondary-800 lh-1 fw-bold">
                    {`${category?.entry_count} artigo${
                      category?.entry_count !== 1 ? "s" : ""
                    }`}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
                  Categoria
                </p>
                <h1 className="m-0 fw-bold text-brand-primary-600 lh-1">
                  Artigos Mais Recentes
                </h1>
              </>
            )}
          </Container>
        </div>
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-row flex-md-row">
            <Col sm={12} lg={8}>
              <ArticlesPage
                label={
                  routerCategory !== "page"
                    ? `Artigos Mais Recentes em ${category?.title} — Página ${
                        page as string
                      }`
                    : `Artigos Mais Recentes — Página ${page as string}`
                }
                articleList={articles}
                category={routerCategory as string}
              />
            </Col>
            <Col sm={12} lg={4}>
              <PopularArticles articles={popular} />
            </Col>
          </Row>
        </Main>
      </Layout>
    </>
  );
};

// This function runs server-side and pre-renders specific pages from the
// application and caches them, where "paths" contains the routes of those
// pages. In this case, we won't need to cache any specific route, as we
// don't know how many pages a certain article category will have.
// `"fallback: 'blocking'" means paths not returned by this function will not
// be pre-rendered at build time, but instead at request time, and the browser
// will display a loading state while it is being rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page is that it
// won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
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
    const articlesPromise =
      params?.category !== "page"
        ? Starlight.articles
            .category(params?.category as string)
            .entries({ page: parseInt(params?.page as string), limit: 8 })
        : Starlight.articles.entries.list({
            page: parseInt(params?.page as string),
            limit: 8,
          });
    const categoryPromise =
      params?.category !== "page"
        ? Starlight.articles.category(params?.category as string).get()
        : null;
    const popularPromise = Starlight.articles.entries.list({
      order: "views:desc",
      limit: 5,
    });
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, articles, category, popular, footer] = await Promise.all([
      headerPromise,
      articlesPromise,
      categoryPromise,
      popularPromise,
      footerPromise,
    ]);

    if (!articles.data.length) {
      return {
        notFound: true,
      };
    }

    return {
      // This "props" object is what our section component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        header: header.data,
        articles: articles,
        category: category?.data ?? null,
        popular: popular.data,
        footer: footer.data,
      },
      revalidate: 15,
    };
  } catch (e) {
    if (e instanceof StarlightError) {
      if (e.response.status === 404) {
        return {
          notFound: true,
        };
      }

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
