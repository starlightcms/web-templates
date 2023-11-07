import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import FeaturesRight from "@/sections/FeaturesRight";
import FeatureCards from "@/sections/FeatureCards";
import FeaturesLeft from "@/sections/FeaturesLeft";
import Testimonials from "@/sections/Testimonials";
import { Layout } from "@/components/Layout";
import Pricing from "@/sections/Pricing";
import Clients from "@/sections/Clients";
import Signup from "@/sections/Signup";
import Hero from "@/sections/Hero";
import FAQ from "@/sections/FAQ";
import Head from "next/head";
import {
  HeaderSingleton,
  HeroSingleton,
  ClientsSingleton,
  FeaturesRightSingleton,
  FeatureCardsSingleton,
  FeaturesLeftSingleton,
  FooterSingleton,
  PricingSingleton,
  FAQItem,
  FAQSingleton,
  TestimonialsSingleton,
  SignupSingleton,
  Plan,
  Testimonial,
} from "@/starlight";

type HomeProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  clients: Singleton<ClientsSingleton>;
  clientCollection: MediaObject[];
  featuresRight: Singleton<FeaturesRightSingleton>;
  featureCards: Singleton<FeatureCardsSingleton>;
  featuresLeft: Singleton<FeaturesLeftSingleton>;
  pricing: Singleton<PricingSingleton>;
  planCollection: Entry<Plan>[];
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
  clients,
  clientCollection,
  featuresRight,
  featureCards,
  featuresLeft,
  pricing,
  planCollection,
  faq,
  faqCollection,
  testimonials,
  testimonialCollection,
  signup,
  footer,
}: HomeProps) {
  return (
    <>
      <Head>
        <title>Landing Page Template</title>
        <meta name="description" content="Web Template created by Starlight" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero singleton={hero} />
      <Clients singleton={clients} collection={clientCollection} />
      <Layout headerSingleton={header} footerSingleton={footer}>
        <FeaturesRight singleton={featuresRight} />
        <FeatureCards singleton={featureCards} />
        <FeaturesLeft singleton={featuresLeft} />
        <Pricing singleton={pricing} collection={planCollection} />
        <FAQ singleton={faq} collection={faqCollection} />
        <Testimonials
          singleton={testimonials}
          collection={testimonialCollection}
        />
        <Signup singleton={signup} />
      </Layout>
    </>
  );
}

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page rather than in
// the individual sections is because it won't run on components, just on pages.
export const getStaticProps = async () => {
  try {
    // Notice the "await": all Starlight SDK methods return Promises.
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const heroPromise = Starlight.singletons.get<HeroSingleton>("hero");
    const clientsPromise =
      Starlight.singletons.get<ClientsSingleton>("clients");
    const featuresRightPromise =
      Starlight.singletons.get<FeaturesRightSingleton>("features-right");
    const featureCardsPromise =
      Starlight.singletons.get<FeatureCardsSingleton>("feature-cards");
    const featuresLeftPromise =
      Starlight.singletons.get<FeaturesLeftSingleton>("features-left");
    const pricingPromise =
      Starlight.singletons.get<PricingSingleton>("pricing");
    const faqPromise = Starlight.singletons.get<FAQSingleton>("faq");
    const testimonialsPromise =
      Starlight.singletons.get<TestimonialsSingleton>("testimonials");
    const signupPromise = Starlight.singletons.get<SignupSingleton>("signup");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [
      header,
      hero,
      clients,
      featuresRight,
      featureCards,
      featuresLeft,
      pricing,
      faq,
      testimonials,
      signup,
      footer,
    ] = await Promise.all([
      headerPromise,
      heroPromise,
      clientsPromise,
      featuresRightPromise,
      featureCardsPromise,
      featuresLeftPromise,
      pricingPromise,
      faqPromise,
      testimonialsPromise,
      signupPromise,
      footerPromise,
    ]);

    // Since we only get the collection ids and metadata, we have to request the collections themselves
    const clientCollectionPromise = Starlight.collection(
      clients.data.data.client_logos.id,
    ).items();
    const planCollectionPromise = Starlight.collection(
      pricing.data.data.plans.id,
    ).items();
    const faqCollectionPromise = Starlight.collection(
      faq.data.data.faq_items.id,
    ).items();
    const testimonialCollectionPromise = Starlight.collection(
      testimonials.data.data.testimonials.id,
    ).items();

    const [
      clientCollection,
      planCollection,
      faqCollection,
      testimonialCollection,
    ] = await Promise.all([
      clientCollectionPromise,
      planCollectionPromise,
      faqCollectionPromise,
      testimonialCollectionPromise,
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
        clients: clients.data,
        clientCollection: clientCollection.data,
        featuresRight: featuresRight.data,
        featureCards: featureCards.data,
        featuresLeft: featuresLeft.data,
        pricing: pricing.data,
        planCollection: planCollection.data,
        faq: faq.data,
        faqCollection: faqCollection.data,
        testimonials: testimonials.data,
        testimonialCollection: testimonialCollection.data,
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
