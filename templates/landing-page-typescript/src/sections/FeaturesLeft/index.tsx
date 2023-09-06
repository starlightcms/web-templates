import Image from "next/image";
import Card from "@/components/Card";
import temp from "./assets/temp.png";
import { Col, Row } from "react-bootstrap";

/**
 * Renders the last few details and information on the page. It has an image, a
 * title, some text and 2 Cards. It is named as such because the information
 * will be displayed on the left part of the screen while on desktop. In
 * smaller pages the image will simply be above the texts.
 *
 * @see Card
 */
export default function FeaturesLeft() {
  return (
    <Row className="d-flex flex-column text-center text-brand-800 flex-lg-row-reverse text-lg-start justify-content-lg-between gap-6">
      <Col className="d-flex flex-column justify-content-center">
        <Image src={temp} alt="TODO" className="w-100" height={625} />
      </Col>
      <Col>
        <h2 className="fw-bold">Nullam felis ipsum, mollis quis.</h2>
        <p className="lh-lg mt-2">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
        <div className="d-flex flex-column gap-4 mt-5">
          <Card
            title="Phasellus feugiat tellus"
            text="In leo nisi, lobortis id vulputate non, aliquet vitae massa. Fusce luctus sed felis id gravida. Aliquam erat volutpat. Quisque et ex nec neque aliquet tincidunt nec sit amet libero."
            button="Learn more"
          />
          <Card
            title="Maecenas quis nunc"
            text="Sed feugiat, massa ac placerat fermentum, metus mi vehicula ante, varius semper magna lacus ut leo."
            button="Learn more"
          />
        </div>
      </Col>
    </Row>
  );
}
