import { Col, Row } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeroSingleton } from "@/starlight";
import Card from "@/components/Card";

// TODO! TYPING OF ARTICLES, ALSO SHOULD NOT BE OPTIONAL
type FeaturedContentProps = {
  label: string;
  articles?: any;
};

// TODO! Texts, image
/**
 * Renders 3 Cards as "featured content". It's supposed to be used in the home
 * page and in the Article page.
 *
 * @see Card
 */
export default function FeaturedContent({
  label,
  articles,
}: FeaturedContentProps) {
  const mockFeaturedContent = [
    {
      title:
        "How to choose the right colors when creating a website? GARGLE GARGLE GARGLEGARGLE",
      description:
        "Visiting places you’ve never been before might be the next big step in your journey.",
      label: "Tech",
      info: "November 12th, 2023 at 2:50 PM",
    },
    {
      title: "Helping a local business reinvent itself",
      description:
        "Visiting places you’ve never been before might be the next big step in your journey.",
      label: "Entertainment",
      info: "November 12th, 2023 at 2:50 PM",
    },
    {
      title:
        "Where to grow your business as a photographer: site or social media?",
      description:
        "Visiting places you’ve never been before might be the next big step in your journey.",
      label: "Science",
      info: "November 12th, 2023 at 2:50 PM",
    },
  ];

  // TODO! ARTICLES MAP

  return (
    <div className="d-flex flex-column gap-4">
      <div className="text-brand-secondary-400 fw-bold">
        <span>{label}</span>
      </div>

      <Row className="d-flex flex-column gap-4">
        {mockFeaturedContent.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            description={card.description}
            label={card.label}
            info={card.info}
            horizontal
          />
        ))}
      </Row>
    </div>
  );
}
