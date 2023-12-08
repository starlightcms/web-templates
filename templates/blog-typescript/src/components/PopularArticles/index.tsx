import styles from "./styles.module.scss";
import { Row } from "react-bootstrap";
import Card from "@/components/Card";
import clsx from "clsx";

// TODO! TYPING OF ARTICLES, ALSO SHOULD NOT BE OPTIONAL
type PopularArticlesProps = {
  label: string;
  articles?: any;
};

// TODO! Texts, image, description

/**
 * Renders a
 */
export const PopularArticles = ({ label, articles }: PopularArticlesProps) => {
  const mockPopularContent = [
    {
      title: "Lessons and insights from 8 years of Pixelgrade",
      label: "Tech",
      info: "Nov 12th at 2:50 PM",
    },
    {
      title: "One line article",
      label: "Entertainment",
      info: "Nov 12th at 2:50 PM",
    },
    {
      title: "Two lines worth of characters",
      label: "Science",
      info: "Nov 12th at 2:50 PM",
    },
    {
      title:
        "An absurdly gigantic and colossal amount of text that won’t show up completely",
      label: "Tech",
      info: "Nov 12th at 2:50 PM",
    },
    {
      title:
        "How to optimize images in WordPress for faster loading (complete guide)",
      label: "Tech",
      info: "Nov 12th at 2:50 PM",
    },
  ];

  // TODO! ARTICLES MAP

  return (
    <div
      className={clsx(
        "d-flex flex-column gap-4 position-sticky",
        styles.stickyContainer,
      )}
    >
      <div className="text-brand-secondary-400 fw-bold">
        <span>{label}</span>
      </div>

      <Row className="d-flex flex-column gap-4">
        {mockPopularContent.map((card, index) => (
          <Card
            key={card.title}
            title={card.title}
            label={card.label}
            rank={index + 1}
            info={card.info}
            small
          />
        ))}
      </Row>
    </div>
  );
};
