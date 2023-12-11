import Starlight, {
  Entry,
  MediaObject,
  Singleton,
  StarlightError,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, HeroSingleton, FooterSingleton } from "@/starlight";
import { FeaturedContent } from "@/components/FeaturedContent";
import { PopularArticles } from "@/components/PopularArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { Title } from "@/components/Title";
import styles from "./styles.module.scss";
import { Main } from "@/components/Main";
import { useRouter } from "next/router";
import clsx from "clsx";

type ArticleProps = {
  header: Singleton<HeaderSingleton>;
  hero: Singleton<HeroSingleton>;
  footer: Singleton<FooterSingleton>;
};

// TODO! DESCRIPTION

const Article = ({ header, hero, footer }: ArticleProps) => {
  const { asPath } = useRouter();

  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined")
      setCurrentURL(window.location.origin + asPath);
  }, [asPath]);

  const placeholderIcon = useMemo(
    () => (
      <div
        style={{
          width: "24px",
          height: "24px",
          backgroundColor: "gray",
          borderRadius: "10px",
        }}
      />
    ),
    [],
  );

  const onShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Blog Template",
          url: currentURL,
        })
        .catch(console.error);
    } else {
      // TODO! SOME WARNING TO SAY TEXT WAS COPIED?
      navigator.clipboard.writeText(currentURL ?? "");
    }
  };

  const shareButtons = useMemo(
    () => [
      {
        icon: placeholderIcon,
        link: `https://twitter.com/intent/tweet?text=${currentURL}`,
        shareClass: "twitter-share-button",
      },
      {
        icon: placeholderIcon,
        link: `https://wa.me/?text=${currentURL}`,
        shareClass: "whatsapp-share-button",
      },
      {
        icon: placeholderIcon,
        link: `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`,
        shareClass: "facebook-share-button",
      },
      {
        icon: placeholderIcon,
        link: `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`,
        shareClass: "linkedin-share-button",
      },
    ],
    [currentURL, placeholderIcon],
  );

  // TODO! GET POST TITLE FROM STARLIGHT
  return (
    <>
      <Title>Post Title</Title>
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

            <div className="d-flex gap-3 mb-5 gap-md-4 flex-wrap">
              <div
                className={clsx(
                  "bg-brand-secondary-200 rounded-5",
                  styles.shareButton,
                )}
                onClick={onShareClick}
              >
                {placeholderIcon}
              </div>
              {shareButtons.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className={clsx(
                    "bg-brand-secondary-200 rounded-5",
                    styles.shareButton,
                    item.shareClass,
                  )}
                  target="_blank"
                >
                  {item.icon}
                </a>
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
};

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

export default Article;
