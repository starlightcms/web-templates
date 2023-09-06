import Card from "@/components/Card";
import compass from "./assets/compass.svg";
import eyeglasses from "./assets/eyeglasses.svg";
import heart from "./assets/heart.svg";
import { Row } from "react-bootstrap";

/**
 * Renders some more details and information on the page usind Cards. It is
 * named as such because it is simply comprised of 3 Cards.
 *
 * @see Card
 */
export default function FeatureCards() {
  return (
    <Row className="d-flex flex-column gap-4 text-center text-brand-800 mx-0 flex-lg-row">
      <Card
        icon={compass}
        title="Vivamus et tellus augue"
        text="Suspendisse id justo ac magna volutpat varius. Ut in dignissim purus. Ut efficitur fermentum sapien vitae scelerisque. Nullam lobortis lorem et eros sollicitudin sagittis."
        button="Learn more"
      />
      <Card
        icon={eyeglasses}
        title="Donec eu pharetra eros"
        text="Suspendisse in augue turpis. Pellentesque ac ante justo. Suspendisse id justo ac magna volutpat varius."
        button="Learn more"
      />
      <Card
        icon={heart}
        title="Sed neque velit"
        text="Morbi ultricies quis tellus sed pretium. Aenean lobortis luctus tellus, sit amet sodales odio consequat eu."
        button="Learn more"
      />
    </Row>
  );
}
