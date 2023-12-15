import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import { PopularArticles } from "@/components/PopularArticles";
import { FeaturedContent } from "@/components/FeaturedContent";
import { ArticlesPage } from "@/components/ArticlesPage";
import { Layout } from "@/components/Layout";
import { Signup } from "@/components/Signup";
import { Col, Row } from "react-bootstrap";
import { Title } from "@/components/Title";
import { Main } from "@/components/Main";
import { Hero } from "@/components/Hero";
import {
  HeaderSingleton,
  ClientsSingleton,
  FeaturesRightSingleton,
  FooterSingleton,
  FAQItem,
  FAQSingleton,
  SignupSingleton,
  Post,
} from "@/starlight";

// TODO! REMOVE UNUSED TYPES FROM TYPES FILE!
type HomeProps = {
  header: Singleton<HeaderSingleton>;
  featured: Entry<Post>[];
  // clients: Singleton<ClientsSingleton>;
  // clientCollection: MediaObject[];
  // featuresRight: Singleton<FeaturesRightSingleton>;
  // faq: Singleton<FAQSingleton>;
  // faqCollection: Entry<FAQItem>[];
  // signup: Singleton<SignupSingleton>;
  footer: Singleton<FooterSingleton>;
};

const Home = ({ header, featured, footer }: HomeProps) => {
  console.log(featured);

  // TODO! MD VS LG! CHECK ALL SPOTS...
  return (
    <>
      <Title>Início</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <Hero entry={featured[0]} />
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-column-reverse flex-md-row">
            <Col className="d-flex flex-column gap-6" sm={12} lg={8}>
              <FeaturedContent label="More Featured Content" />
              {/* //TODO! GET LASTPAGE OF ALL! */}
              <ArticlesPage
                label="Latest Articles"
                category={"page"}
                currentPage={1}
                lastPage={10}
              />
            </Col>
            <Col sm={12} lg={4}>
              <PopularArticles label="Most Popular" />
            </Col>
          </Row>
          <Signup />
        </Main>
      </Layout>
    </>
  );
};

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page rather than in
// the individual sections is because it won't run on components, just on pages.
export const getStaticProps = async () => {
  // TODO! REMOVE UNUSED REQUESTS
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const featuredPromise = Starlight.collection<Entry<Post>>("featured").items(
      { order: "published_at:desc" },
    );
    // const signupPromise = Starlight.singletons.get<SignupSingleton>("signup");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, featured, footer] = await Promise.all([
      headerPromise,
      featuredPromise,
      // featuresRightPromise,
      // faqPromise,
      // signupPromise,
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
        featured: featured.data,
        // featuresRight: featuresRight.data,
        // faq: faq.data,
        // faqCollection: faqCollection.data,
        // signup: signup.data,
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
