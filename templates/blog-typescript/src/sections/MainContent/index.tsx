import { Col, Row } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeroSingleton } from "@/starlight";
import Card from "@/components/Card";

// TODO! SINGLETON - OBLIGATORY! ALSO, SINGLETON TYPE
type MainContentProps = {
  singleton: Singleton<HeroSingleton>;
};

// TODO! Texts, image, description

/**
 * Renders a
 */
export default function MainContent({ singleton }: MainContentProps) {
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

  const mockLatestArticles = [
    {
      title: "How to choose the right customer for your photo business?",
      description:
        "Visiting places you’ve never been before might be the next big step in your journey.",
      label: "Tech",
      info: "November 12th, 2023 at 2:50 PM",
    },
    {
      title:
        "How to optimize images in WordPress for faster loading (complete guide)",
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

  return (
    <Col className="d-flex flex-column gap-6" sm={12} lg={8}>
      <div className="d-flex flex-column gap-4">
        <div className="text-brand-secondary-400 fw-bold">
          <span>More Featured Content</span>
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

      <div className="d-flex flex-column gap-4">
        <div className="text-brand-secondary-400 fw-bold">
          <span>Latest Articles</span>
        </div>

        <Row className="d-flex flex-column gap-6">
          {mockLatestArticles.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              description={card.description}
              label={card.label}
              info={card.info}
            />
          ))}
        </Row>
      </div>
    </Col>
  );
}
