import Starlight, {
  Singleton,
  StarlightError,
  VisualContent,
} from "@starlightcms/next-sdk";
import { HeaderSingleton, FooterSingleton, AboutSingleton } from "@/starlight";
import { Layout } from "@/components/Layout";
import { Container } from "react-bootstrap";
import { Title } from "@/components/Title";
import styles from "./styles.module.scss";
import { Main } from "@/components/Main";
import { GetStaticProps } from "next";

type AboutProps = {
  header: Singleton<HeaderSingleton>;
  about: Singleton<AboutSingleton>;
  footer: Singleton<FooterSingleton>;
};

const About = ({ header, about, footer }: AboutProps) => (
  <>
    <Title>{about.title}</Title>
    <Layout headerSingleton={header} footerSingleton={footer}>
      <div className="bg-brand-primary-50">
        <Container className="d-flex flex-column pt-8 px-4 pb-6 gap-4">
          <div className="d-flex flex-column gap-2 gap-md-4">
            <h1 className="m-0 fw-bold text-brand-primary-600">
              {about.title}
            </h1>
            <span className="m-0 text-brand-primary-700 fs-5 lh-1">
              {about.data.description}
            </span>
          </div>
        </Container>
      </div>
      <Main>
        <div className={styles.visualContainer}>
          <VisualContent content={about.data.text} />
        </div>
      </Main>
    </Layout>
  </>
);

// This function runs server-side and fetches whatever the page needs to render.
// In this case, we'll request the section singletons in the configured workspace.
// In case you're wondering, the reason we request this on the page is that it
// won't run on components, just on pages.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const headerPromise = Starlight.singletons.get<HeaderSingleton>("header");
    const aboutPromise = Starlight.singletons.get<AboutSingleton>("about");
    const footerPromise = Starlight.singletons.get<FooterSingleton>("footer");

    // We wait for all the promises and store the responses into an array
    const [header, about, footer] = await Promise.all([
      headerPromise,
      aboutPromise,
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
        about: about.data,
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

export default About;
