import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import cloud from "./assets/cloud.svg";
import award from "./assets/award.svg";
import temp from "./assets/temp.png";
import Card from "@/components/Card";
import Image from "next/image";
import clsx from "clsx";

// TODO! Review description?
/**
 * Renders the first details and information on the page. It has an image, a
 * title, some text and 2 (borderless) Cards. It is named as such because the
 * information will be displayed on the right part of the screen while on
 * desktop. In smaller pages the image will simply be above the texts.
 */
export default function FeaturesRight() {
  return (
    <Row className="d-flex flex-column text-center text-brand-800 flex-lg-row text-lg-start justify-content-lg-between gap-6">
      <Col className="d-flex flex-column justify-content-center">
        <Image src={temp} alt="TODO" className="w-100" height={500} />
      </Col>
      <Col className="d-flex flex-column justify-content-center">
        <h2 className="fw-bold">Nullam felis ipsum, mollis quis.</h2>
        <p className="lh-lg mt-3 mb-0">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
        <div
          className={clsx("d-flex flex-column gap-4 mt-5", styles.cardWrapper)}
        >
          <Card
            icon={award}
            text="Suspendisse id justo ac magna volutpat vus. Ut in dignissim purus. Ut efficitur fermentum sapien vitae scelerisque. Nullam lobortis lorem et eros sollicitudin sagittis."
            borderless
          />
          <Card
            icon={cloud}
            text="Aliquam imperdiet, orci et sollicitudin porttitor, magna augue convallis erat, id consequat augue nibh vitae lectus."
            borderless
          />
        </div>
      </Col>
    </Row>
  );
}
