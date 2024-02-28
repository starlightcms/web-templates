import { Singleton, Image } from "@starlightcms/next-sdk";
import { FeaturesLeftSingleton } from "@/starlight";
import { Col, Row } from "react-bootstrap";
import Card from "@/components/Card";

type FeaturesLeftProps = {
  singleton: Singleton<FeaturesLeftSingleton>;
};

/**
 * Renders the last few details and information on the page. It has an image, a
 * title, some text and 2 Cards. It is named as such because the information
 * will be displayed on the left part of the screen while on desktop. In
 * smaller pages the image will simply be above the texts.
 *
 * @see Card
 */
export default function FeaturesLeft({ singleton }: FeaturesLeftProps) {
  return (
    <Row className="d-flex flex-column text-center text-brand-800 flex-lg-row-reverse text-lg-start justify-content-lg-between gap-6">
      <Col className="d-flex flex-column justify-content-center">
        <Image media={singleton.data.image} className="h-100 w-auto" />
      </Col>
      <Col>
        <h2 className="fw-bold">{singleton.data.title}</h2>
        <p className="lh-lg mt-2">{singleton.data.description}</p>
        <div className="d-flex flex-column gap-4 mt-5">
          <Card
            title={singleton.data.card_1_title}
            text={singleton.data.card_1_text}
            button={singleton.data.card_1_button}
          />
          <Card
            title={singleton.data.card_2_title}
            text={singleton.data.card_2_text}
            button={singleton.data.card_2_button}
          />
        </div>
      </Col>
    </Row>
  );
}
