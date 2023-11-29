import { Container } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeroSingleton } from "@/starlight";

// TODO! SINGLETON - OBLIGATORY!
type HeroProps = {
  singleton: Singleton<HeroSingleton>;
};

// TODO! Texts, image

/**
 * Renders a Hero - the topmost component of the page with the picture,
 * title, description and information of the featured article. It is outside
 * the main Container component because of its background.
 */
export default function Hero({ singleton }: HeroProps) {
  return (
    <div className="bg-brand-primary-50">
      <Container className="px-4 py-7 d-flex flex-column gap-3">
        <p className="text-brand-secondary-400 fw-bold fs-6 mb-0">
          Featured Article
        </p>
        <div
          style={{ height: "380px" }}
          className="w-100 bg-brand-secondary-900 rounded-4"
        />
        <div>
          <h1 className="text-brand-primary-600 fw-bold lh-1">
            Travelling as a way of self-discovery and progress
          </h1>
          <p className="text-brand-primary-700 fs-5 mt-2 mb-3">
            Visiting places you’ve never been before might be the next big step
            in your journey.
          </p>
          <p className="text-brand-secondary-400 fw-semibold fs-6 my-0">
            By John Doe • November 12th, 2023 at 2:50 PM
          </p>
        </div>
        {/*<Row className="text-center text-brand-800 text-lg-start d-lg-flex justify-content-lg-between pt-lg-0">*/}
        {/*  <Col*/}
        {/*    className="align-items-start justify-content-center d-lg-flex flex-lg-column"*/}
        {/*    sm={12}*/}
        {/*    lg={5}*/}
        {/*  >*/}
        {/*    <h1 className="fw-bold">{singleton.data.title}</h1>*/}
        {/*    <p className="lh-lg">{singleton.data.description}</p>*/}
        {/*    <div>*/}
        {/*      <Button className="me-3 bg-brand-500 border-brand-500 fw-bold">*/}
        {/*        {singleton.data.main_button_label}*/}
        {/*      </Button>*/}
        {/*      <Button className="bg-transparent text-brand-500 border-brand-500 fw-bold">*/}
        {/*        {singleton.data.second_button_label}*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </Col>*/}

        {/*  <Col className="d-flex justify-content-center" sm={12} lg={6}>*/}
        {/*    <Image*/}
        {/*      media={singleton.data.image}*/}
        {/*      alt="Cellphone"*/}
        {/*      className="my-5 mw-100"*/}
        {/*      height={535}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
      </Container>
    </div>
  );
}
