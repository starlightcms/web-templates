import { Button, Col, Container, Row } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeroSingleton } from "@/starlight";
import styles from "./styles.module.scss";

type HeroProps = {
  singleton: Singleton<HeroSingleton>;
};

/**
 * Renders a Hero - the topmost component of the page with basic information,
 * "Sign up" and "Learn more" buttons and the main image. It is outside the
 * main Container component because of the background.
 */
export default function Hero({ singleton }: HeroProps) {
  return (
    <div className={styles.heroBackground}>
      <Container className="pt-7 px-4">
        <Row className="text-center text-brand-800 text-lg-start d-lg-flex justify-content-lg-between pt-lg-0">
          <Col
            className="align-items-start justify-content-center d-lg-flex flex-lg-column"
            sm={12}
            lg={5}
          >
            <h1 className="fw-bold">{singleton.data.title}</h1>
            <p className="lh-lg">{singleton.data.description}</p>
            <div>
              <Button className="me-3 bg-brand-500 border-brand-500 fw-bold">
                {singleton.data.main_button_label}
              </Button>
              <Button className="bg-transparent text-brand-500 border-brand-500 fw-bold">
                {singleton.data.second_button_label}
              </Button>
            </div>
          </Col>

          <Col className="d-flex justify-content-center" sm={12} lg={6}>
            <Image
              media={singleton.data.image}
              alt="Cellphone"
              className="my-5 mw-100"
              height={535}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
