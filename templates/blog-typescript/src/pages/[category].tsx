import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import FeaturesRight from "@/sections/FeaturesRight";
import FeatureCards from "@/sections/FeatureCards";
import { Layout } from "@/components/Layout";
import Signup from "@/sections/Signup";
import Hero from "@/sections/Hero";
import FAQ from "@/sections/FAQ";
import Head from "next/head";
import { Col, Row } from "react-bootstrap";
import {
  HeaderSingleton,
  HeroSingleton,
  ClientsSingleton,
  FeaturesRightSingleton,
  FeatureCardsSingleton,
  FooterSingleton,
  FAQItem,
  FAQSingleton,
  TestimonialsSingleton,
  SignupSingleton,
  Testimonial,
} from "@/starlight";
import MainContent from "@/sections/MainContent";
import PopularContent from "@/sections/PopularContent";
import { GetStaticPaths, GetStaticProps } from "next";

type HomeProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  clients: Singleton<ClientsSingleton>;
  clientCollection: MediaObject[];
  featuresRight: Singleton<FeaturesRightSingleton>;
  featureCards: Singleton<FeatureCardsSingleton>;
  faq: Singleton<FAQSingleton>;
  faqCollection: Entry<FAQItem>[];
  testimonials: Singleton<TestimonialsSingleton>;
  testimonialCollection: Entry<Testimonial>[];
  signup: Singleton<SignupSingleton>;
  footer: Singleton<FooterSingleton>;
};

export default function Home({
  header,
  hero,
  featuresRight,
  featureCards,
  faq,
  faqCollection,
  signup,
  footer,
}: HomeProps) {
  // TODO! FOOTER + HEADER FIXES
  return (
    <>
      <Head>
        <title>Landing Page Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero singleton={hero} />
      <Layout headerSingleton={header} footerSingleton={footer}>
        <h1>OLA MUNDO</h1>
      </Layout>
    </>
  );
}

// TODO! COMMENT EXPLAINING
export const getStaticPaths: GetStaticPaths = async () => {
  // TODO! GET ALL CATEGORIES
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
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const heroPromise = Starlight.singletons.get<HeroSingleton>("hero");
    const featuresRightPromise =
      Starlight.singletons.get<FeaturesRightSingleton>("features-right");
    const featureCardsPromise =
      Starlight.singletons.get<FeatureCardsSingleton>("feature-cards");
    const faqPromise = Starlight.singletons.get<FAQSingleton>("faq");
    const signupPromise = Starlight.singletons.get<SignupSingleton>("signup");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, hero, featuresRight, featureCards, faq, signup, footer] =
      await Promise.all([
        headerPromise,
        heroPromise,
        featuresRightPromise,
        featureCardsPromise,
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
        featureCards: featureCards.data,
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
