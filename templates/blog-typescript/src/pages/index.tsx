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
  HeroSingleton,
  ClientsSingleton,
  FeaturesRightSingleton,
  FooterSingleton,
  FAQItem,
  FAQSingleton,
  SignupSingleton,
} from "@/starlight";

// TODO! REMOVE UNUSED TYPES...
type HomeProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  clients: Singleton<ClientsSingleton>;
  clientCollection: MediaObject[];
  featuresRight: Singleton<FeaturesRightSingleton>;
  faq: Singleton<FAQSingleton>;
  faqCollection: Entry<FAQItem>[];
  signup: Singleton<SignupSingleton>;
  footer: Singleton<FooterSingleton>;
};

const Home = ({ header, hero, signup, footer }: HomeProps) => {
  // TODO! HEADER FIXES?
  // TODO! MD VS LG! CHECK ALL SPOTS...
  return (
    <>
      <Title>Início</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <Hero singleton={hero} />
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
          <Signup singleton={signup} />
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
    const heroPromise = Starlight.singletons.get<HeroSingleton>("hero");
    const featuresRightPromise =
      Starlight.singletons.get<FeaturesRightSingleton>("features-right");
    const faqPromise = Starlight.singletons.get<FAQSingleton>("faq");
    const signupPromise = Starlight.singletons.get<SignupSingleton>("signup");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, hero, featuresRight, faq, signup, footer] =
      await Promise.all([
        headerPromise,
        heroPromise,
        featuresRightPromise,
        faqPromise,
        signupPromise,
        footerPromise,
      ]);

    // Since we only get the collection ids and metadata, we have to request the collections themselves
    const faqCollectionPromise = Starlight.collection(
      faq.data.data.faq_items.id,
    ).items();

    const [faqCollection] = await Promise.all([faqCollectionPromise]);

    return {
      // This "props" object is what our section component (above) will receive as props.
      props: {
        // All Starlight SDK responses are "raw" and contain everything the API
        // returns, including metadata related to the request. API responses
        // always return the requested content in an object called "data",
        // which is what we need to pass to our page.
        header: header.data,
        hero: hero.data,
        featuresRight: featuresRight.data,
        faq: faq.data,
        faqCollection: faqCollection.data,
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
