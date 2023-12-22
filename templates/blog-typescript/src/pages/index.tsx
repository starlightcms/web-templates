import Starlight, {
  Entry,
  Singleton,
  StarlightError,
  StarlightListResponse,
} from "@starlightcms/next-sdk";
import {
  HeaderSingleton,
  FooterSingleton,
  Article,
  SignupSingleton,
} from "@/starlight";
import { PopularArticles } from "@/components/PopularArticles";
import { FeaturedContent } from "@/components/FeaturedContent";
import { ArticlesPage } from "@/components/ArticlesPage";
import { Layout } from "@/components/Layout";
import { Signup } from "@/components/Signup";
import { Col, Row } from "react-bootstrap";
import { Title } from "@/components/Title";
import { Main } from "@/components/Main";
import { Hero } from "@/components/Hero";
import { GetStaticProps } from "next";

type HomeProps = {
  header: Singleton<HeaderSingleton>;
  articles: StarlightListResponse<Entry<Article>>;
  featured: Entry<Article>[];
  popular: Entry<Article>[];
  signup: Singleton<SignupSingleton>;
  footer: Singleton<FooterSingleton>;
};

const Home = ({
  header,
  articles,
  featured,
  popular,
  signup,
  footer,
}: HomeProps) => (
  <>
    <Title>Início</Title>
    <Layout headerSingleton={header} footerSingleton={footer}>
      <Hero entry={featured[0]} />
      <Main>
        <Row className="gx-6 gy-6 d-flex flex-column-reverse flex-md-row">
          <Col className="d-flex flex-column gap-6" sm={12} lg={8}>
            <FeaturedContent
              label="Mais Destaques"
              articles={featured.slice(1)}
            />
            <ArticlesPage
              label="Artigos Mais Recentes"
              articleList={articles}
              category={"page"}
            />
          </Col>
          <Col sm={12} lg={4}>
            <PopularArticles articles={popular} />
          </Col>
        </Row>
        <Signup singleton={signup} />
      </Main>
    </Layout>
  </>
);

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page rather than in
// the individual sections is because it won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async () => {
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const articlesPromise = Starlight.articles.entries.list({
      page: 1,
      limit: 8,
    });
    const featuredPromise = Starlight.collection<Entry<Article>>(
      "featured",
    ).items({ order: "published_at:desc" });
    const popularPromise = Starlight.articles.entries.list({
      order: "views:desc",
      limit: 5,
    });
    const signupPromise = Starlight.singletons.get<SignupSingleton>("signup");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, articles, featured, popular, signup, footer] =
      await Promise.all([
        headerPromise,
        articlesPromise,
        featuredPromise,
        popularPromise,
        signupPromise,
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
        featured: featured.data,
        popular: popular.data,
        signup: signup.data,
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

export default Home;
