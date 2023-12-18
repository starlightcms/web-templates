import Starlight, {
  Entry,
  Singleton,
  StarlightError,
  VisualContent,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton, Article } from "@/starlight";
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
  entry: Entry<Article>;
  featured: Entry<Article>[];
  popular: Entry<Article>[];
  footer: Singleton<FooterSingleton>;
};

// TODO! DESCRIPTION

const Article = ({
  header,
  entry,
  featured,
  popular,
  footer,
}: ArticleProps) => {
  const { asPath } = useRouter();

  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined")
      setCurrentURL(window.location.origin + asPath);
  }, [asPath]);

  // TODO! NEEDS TO BE USEMEMO? NOT - REWORK!
  const metadata = useMemo(() => {
    const date = entry.published_at
      ? new Date(Date.parse(entry.published_at))
      : undefined;

    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Fortaleza",
    }).format(date);

    // TODO!

    return "";
    // return `Por ${entry.author.name} • ${formattedDate}`;
  }, [entry.published_at, entry.author.name]);

  // TODO! REPLACE PLACEHOLDER ICONS WITH SVGS...
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

  // TODO! STYLE PICTURE CAPTION

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
              {metadata}
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
              <VisualContent content={entry.data.content} />
              <div
                className="bg-brand-primary-300 w-100"
                style={{ height: "1px" }}
              />
              <FeaturedContent label="Mais Destaques" articles={featured} />
            </Col>
            <Col sm={12} lg={4}>
              <PopularArticles label="Mais Populares" articles={popular} />
            </Col>
          </Row>
        </Main>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO! GET ALL CATEGORIES FROM STARLIGHT?
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
