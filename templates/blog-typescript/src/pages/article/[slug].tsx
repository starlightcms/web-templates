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
import styles from "./styles.module.scss";
import clsx from "clsx";
import FeaturedContent from "@/components/FeaturedContent";
import PopularArticles from "@/components/PopularArticles";
import { Main } from "@/components/Main";

type ArticleProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  footer: Singleton<FooterSingleton>;
};

// TODO! DESCRIPTION

export default function Article({ header, hero, footer }: ArticleProps) {
  const logos = []; // TODO! USE THIS?

  // TODO! TITLE
  return (
    <>
      <Head>
        <title>Blog Template</title>
      </Head>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <div className="bg-brand-primary-50">
          <Container className="d-flex flex-column pt-8 px-4">
            <h1 className="fw-bold text-brand-primary-600">
              Traveling as a way of self-discovery and progress
            </h1>
            <span className="mb-3 text-brand-primary-700 fs-5 lh-1">
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit
              esse quam nihil molestiae consequatu.
            </span>
            <p className="mb-4 text-brand-secondary-400 fs-6 lh-1 fw-bold">
              By John Doe • November 12th, 2023 at 2:50 PM
            </p>

            <div className="d-flex gap-4 mb-5">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={clsx(
                    "bg-brand-secondary-200 rounded-5",
                    styles.shareButton,
                  )}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "gray",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}
            </div>
          </Container>
        </div>
        <div className={styles.imageContainer}>
          <Container>
            <div
              style={{
                height: "380px",
              }}
              className="w-100 bg-brand-secondary-900 rounded-4"
            />
            {/*  // TODO! MISSING LABEL ON IMAGE... SEE HERO */}
          </Container>
        </div>
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-column flex-md-row">
            <Col className="d-flex flex-column gap-6" sm={12} lg={8}>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                adipisci aliquam expedita ipsum pariatur reprehenderit. Harum,
                id libero maiores, nobis odit officiis, pariatur perspiciatis
                rem tempore temporibus velit voluptate? Blanditiis?
              </div>
              <div
                className="bg-brand-primary-300 w-100"
                style={{ height: "1px" }}
              />
              <FeaturedContent label="More Featured Content" />
            </Col>
            <Col sm={12} lg={4}>
              <PopularArticles label="Most Popular" />
            </Col>
          </Row>
        </Main>
      </Layout>
    </>
  );
}

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
