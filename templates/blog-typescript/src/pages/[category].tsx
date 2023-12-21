import Starlight, {
  Entry,
  MediaObject,
  ModelCategory,
  Singleton,
  StarlightError,
  StarlightListResponse,
} from "@starlightcms/next-sdk";
import { Layout } from "@/components/Layout";
import { HeaderSingleton, FooterSingleton, Article } from "@/starlight";
import { PopularArticles } from "@/components/PopularArticles";
import { ArticlesPage } from "@/components/ArticlesPage";
import { GetStaticPaths, GetStaticProps } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { Title } from "@/components/Title";
import { Main } from "@/components/Main";
import { useRouter } from "next/router";

type CategoryProps = {
  header: Singleton<HeaderSingleton>;
  articles: StarlightListResponse<Entry<Article>>;
  category: ModelCategory;
  popular: Entry<Article>[];
  footer: Singleton<FooterSingleton>;
};

const Category = ({
  header,
  articles,
  category,
  popular,
  footer,
}: CategoryProps) => {
  const router = useRouter();
  const { category: routerCategory } = router.query;

  return (
    <>
      <Title>${category.title}</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <div className="bg-brand-primary-50">
          <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
            <div className="d-flex flex-column gap-2">
              <p className="m-0 fw-bold text-brand-secondary-400 lh-1">
                Categoria
              </p>
              <h1 className="m-0 fw-bold text-brand-primary-600">
                {category.title}
              </h1>
              {/*<span className="m-0 text-brand-primary-700 fs-5 lh-1">*/}
              {/*  Quis autem vel eum iure reprehenderit qui in ea voluptate velit*/}
              {/*  esse quam nihil molestiae consequatu.*/}
              {/*</span>*/}
            </div>
            <div className="bg-brand-secondary-200 px-3 py-2 align-self-start rounded-5">
              {`${category.entry_count} artigo${
                category.entry_count !== 1 ? "s" : ""
              }`}
            </div>
          </Container>
        </div>
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-row flex-md-row">
            <Col sm={12} lg={8}>
              <ArticlesPage
                label={`Artigos Mais Recentes em ${category.title}`}
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
// pages. In this case, we'll cache the route of the first page of each
// category (e.g. /tech, /science).
// `"fallback: 'blocking'" means paths not returned by this function will not
// be pre-rendered at build time, but instead at request time, and the browser
// will display a loading state while it is being rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await Starlight.articles.categories.list();
    const categorySlugArray = categories.data.map(function (category) {
      return category.slug;
    });

    return {
      paths: categorySlugArray,
      fallback: "blocking",
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
    // TODO! AUMENTAR LIMITS PRA 8
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const articlesPromise = Starlight.articles.entries.list({
      page: parseInt(params?.page as string),
      limit: 3,
    });
    const categoryPromise = Starlight.articles
      .category(params?.category as string)
      .entries({ page: 1, limit: 3 });
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

    return {
      // This "props" object is what our section component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        header: header.data,
        articles: articles,
        category: category.data,
        popular: popular.data,
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

export default Category;
