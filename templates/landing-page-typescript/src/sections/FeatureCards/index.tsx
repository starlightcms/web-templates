import { FeatureCardsSingleton } from "@/starlight";
import { Singleton } from "@starlightcms/next-sdk";
import { Row } from "react-bootstrap";
import Card from "@/components/Card";

type FeatureCardsProps = {
  singleton: Singleton<FeatureCardsSingleton>;
};

/**
 * Renders some more details and information on the page using Cards. It is
 * named as such because it is simply comprised of 3 Cards.
 *
 * @see Card
 */
export default function FeatureCards({ singleton }: FeatureCardsProps) {
  return (
    <Row className="d-flex flex-column gap-4 text-center text-brand-800 mx-0 flex-lg-row">
      <Card
        icon={singleton.data.card_1_icon}
        title={singleton.data.card_1_title}
        text={singleton.data.card_1_text}
        button={singleton.data.card_1_button}
      />
      <Card
        icon={singleton.data.card_2_icon}
        title={singleton.data.card_2_title}
        text={singleton.data.card_2_text}
        button={singleton.data.card_2_button}
      />
      <Card
        icon={singleton.data.card_3_icon}
        title={singleton.data.card_3_title}
        text={singleton.data.card_3_text}
        button={singleton.data.card_3_button}
      />
    </Row>
  );
}
