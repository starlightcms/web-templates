import { Singleton, Image } from "@starlightcms/next-sdk";
import { FeaturesRightSingleton } from "@/starlight";
import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import clsx from "clsx";

type FeaturesRightProps = {
  singleton: Singleton<FeaturesRightSingleton>;
};

/**
 * Renders the first details and information on the page. It has an image, a
 * title, some text and 2 (borderless) Cards. It is named as such because the
 * information will be displayed on the right part of the screen while on
 * desktop. In smaller pages the image will simply be above the texts.
 *
 * @see Card
 */
export default function FeaturesRight({ singleton }: FeaturesRightProps) {
  return (
    <Row className="d-flex flex-column text-center text-brand-800 flex-lg-row text-lg-start justify-content-lg-between gap-6">
      <Col className="d-flex flex-column justify-content-center">
        <Image
          media={singleton.data.image}
          alt="TODO"
          className="w-100"
          height={500}
        />
      </Col>
      <Col className="d-flex flex-column justify-content-center">
        <h2 className="fw-bold">{singleton.data.title}</h2>
        <p className="lh-lg mt-3 mb-0">{singleton.data.description}</p>
        <div
          className={clsx("d-flex flex-column gap-4 mt-5", styles.cardWrapper)}
        >
          {/*<Card*/}
          {/*  icon={singleton.data.card_1_icon}*/}
          {/*  text={singleton.data.card_1_text}*/}
          {/*  borderless*/}
          {/*/>*/}
          {/*<Card*/}
          {/*  icon={singleton.data.card_2_icon}*/}
          {/*  text={singleton.data.card_2_text}*/}
          {/*  borderless*/}
          {/*/>*/}
        </div>
      </Col>
    </Row>
  );
}
