import { Button, Col, Container, Row } from "react-bootstrap";
import Cellphone from "./assets/Cellphone.png";
import styles from "./styles.module.scss";
import Image from "next/image";

// TODO! Review description?
/**
 * Renders a Hero - the topmost component of the page with basic information,
 * "Sign up" and "Learn more" buttons and the main image. It is outside the
 * main Container component because of the background.
 */
export default function Hero() {
  return (
    <div className={styles.heroBackground}>
      <Container className="pt-7 px-4">
        <Row className="text-center text-brand-800 text-lg-start d-lg-flex justify-content-lg-between pt-lg-0">
          <Col
            className="align-items-start justify-content-center d-lg-flex flex-lg-column"
            sm={12}
            lg={5}
          >
            <h1 className="fw-bold">Lorem ipsum dolor sit amet consectetur.</h1>
            <p className="lh-lg">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <div>
              <Button className="me-3 bg-brand-500 border-brand-500 fw-bold">
                Sign up
              </Button>
              <Button className="bg-transparent text-brand-500 border-brand-500 fw-bold">
                Learn more
              </Button>
            </div>
          </Col>

          <Col className="d-flex justify-content-center" sm={12} lg={6}>
            <Image
              src={Cellphone}
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
