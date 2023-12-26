import Starlight, {
  Entry,
  Singleton,
  StarlightError,
  VisualContent,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton, Article } from "@/starlight";
import { FeaturedContent } from "@/components/FeaturedContent";
import { PopularArticles } from "@/components/PopularArticles";
import { Image as SLImage } from "@starlightcms/next-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import twitterX from "./assets/twitter-x.svg";
import { Layout } from "@/components/Layout";
import facebook from "./assets/facebook.svg";
import linkedin from "./assets/linkedin.svg";
import whatsapp from "./assets/whatsapp.svg";
import { Title } from "@/components/Title";
import styles from "./styles.module.scss";
import { Main } from "@/components/Main";
import { useRouter } from "next/router";
import share from "./assets/share.svg";
import Image from "next/image";
import clsx from "clsx";

type ArticleProps = {
  header: Singleton<HeaderSingleton>;
  entry: Entry<Article>;
  featured: Entry<Article>[];
  popular: Entry<Article>[];
  footer: Singleton<FooterSingleton>;
};

const Article = ({
  header,
  entry,
  featured,
  popular,
  footer,
}: ArticleProps) => {
  const { asPath } = useRouter();

  const [currentURL, setCurrentURL] = useState("");
  const [isCopiedOpen, setIsCopiedOpen] = useState(false);

  useEffect(() => {
    if (isCopiedOpen) {
      const timer1 = setTimeout(() => setIsCopiedOpen(false), 3000);
      return () => clearTimeout(timer1);
    }
  }, [isCopiedOpen]);

  useEffect(() => {
    if (typeof window !== "undefined")
      setCurrentURL(window.location.origin + asPath);
  }, [asPath]);

  const dateObject = entry.published_at
    ? new Date(Date.parse(entry.published_at))
    : undefined;

  // 15 de Janeiro de 2024
  const articleDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  // 10:35
  const articleTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  const onShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Blog Template",
          url: currentURL,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(currentURL ?? "");
      setIsCopiedOpen(true);
    }
  };

  const shareButtons = useMemo(
    () => [
      {
        icon: twitterX,
        link: `https://twitter.com/intent/tweet?text=${currentURL}`,
        shareClass: "twitter-share-button",
      },
      {
        icon: whatsapp,
        link: `https://wa.me/?text=${currentURL}`,
        shareClass: "whatsapp-share-button",
      },
      {
        icon: facebook,
        link: `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`,
        shareClass: "facebook-share-button",
      },
      {
        icon: linkedin,
        link: `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`,
        shareClass: "linkedin-share-button",
      },
    ],
    [currentURL],
  );

  return (
    <>
      <Title>{entry.title}</Title>
      <Layout headerSingleton={header} footerSingleton={footer}>
        <div className="bg-brand-primary-50">
          <Container className="d-flex flex-column pt-8 px-4">
            <h1 className="fw-bold text-brand-primary-600">{entry.title}</h1>
            <span className="mb-3 text-brand-primary-700 fs-5 lh-1">
              {entry.data.description}
            </span>
            <p className="mb-4 text-brand-secondary-400 fs-6 lh-1 fw-bold">
              {`Por ${entry.author.name} • ${articleDate} às ${articleTime}`}
            </p>

            {/* // TODO! LAST THING: CHECK IF ANIMATION NEEDED, CHECK IF MARGIN BOTTOM */}
            <div className="d-flex flex-column gap-3 flex-lg-row mb-5">
              <div className="d-flex gap-3 gap-md-4 flex-wrap">
                <div
                  className={clsx(
                    "bg-brand-secondary-200 rounded-5",
                    styles.shareButton,
                  )}
                  onClick={onShareClick}
                >
                  <Image
                    src={share}
                    alt={"Compartilhar"}
                    width={24}
                    height={24}
                  />
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
                    <Image
                      src={item.icon}
                      alt={item.shareClass}
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </div>
              {isCopiedOpen && (
                <p className="align-self-center m-0 fs-6 fw-semibold text-brand-primary-500">
                  Copiado para a àrea de transferência!
                </p>
              )}
            </div>
          </Container>
        </div>
        <div className={styles.imageBackground}>
          <Container>
            <div
              className={clsx(
                "d-flex align-items-center justify-content-center flex-shrink-0 bg-brand-secondary-200 position-relative overflow-hidden rounded-4",
                styles.imageContainer,
              )}
            >
              <SLImage
                media={entry.data.image}
                alt={entry.data.image.alt}
                className="position-absolute w-100 h-100 object-fit-cover"
              />

              {entry.category !== null && (
                <div
                  className={clsx(
                    "bg-brand-secondary-200 text-brand-secondary-800 fw-bold position-absolute py-2 lh-1 rounded-5",
                    styles.label,
                  )}
                >
                  {entry.category.title}
                </div>
              )}
            </div>
          </Container>
        </div>
        <Main>
          <Row className="gx-6 gy-6 d-flex flex-column flex-md-row">
            <Col
              className={clsx(
                "d-flex flex-column gap-6",
                styles.visualContainer,
              )}
              sm={12}
              lg={8}
            >
              <VisualContent content={entry.data.content} />
              <div
                className="bg-brand-primary-300 w-100"
                style={{ height: "1px" }}
              />
              <FeaturedContent label="Mais Destaques" articles={featured} />
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
// pages. In this case, we'll cache the routes of the 15 latest articles.
// `"fallback: 'blocking'" means paths not returned by this function will not
// be pre-rendered at build time, but instead at request time, and the browser
// will display a loading state while it is being rendered.
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const latestArticles = await Starlight.articles.entries.list({ limit: 15 });
    const articleSlugArray = latestArticles.data.map(function (entry) {
      return `/article/${entry.slug}`;
    });

    return {
      paths: articleSlugArray,
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
// In case you're wondering, the reason we request this on the page is that it
// won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const entryPromise = Starlight.articles.entries.get(params?.slug as string);
    const featuredPromise = Starlight.collection<Entry<Article>>(
      "featured",
    ).items({ order: "published_at:desc" });
    const popularPromise = Starlight.articles.entries.list({
      order: "views:desc",
      limit: 5,
    });
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, entry, featured, popular, footer] = await Promise.all([
      headerPromise,
      entryPromise,
      featuredPromise,
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
        entry: entry.data,
        featured: featured.data,
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

export default Article;
