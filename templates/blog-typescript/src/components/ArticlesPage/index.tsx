import PageSelector from "@/components/PageSelector";
import { Col, Row } from "react-bootstrap";
import Card from "@/components/Card";

// TODO! TYPING OF ARTICLES, ALSO SHOULD NOT BE OPTIONAL
type ArticlesPageProps = {
  label: string;
  articles?: any;
  category: string;
  currentPage: number;
  lastPage: number;
};

// TODO! Texts, image
/**
 * Renders a page of articles (as Cards) with a small title label and a page
 * selector at the bottom. Requires a label, a list of articles to be
 * displayed, its category (being "page" or a category name), the current page
 * number and the last page number as props.
 *
 * @see Card
 * @see PageSelector
 */
export default function ArticlesPage({
  label,
  articles,
  category,
  currentPage,
  lastPage,
}: ArticlesPageProps) {
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

  // TODO! ARTICLES MAP
  // TODO! GET PAGE SELECTOR PROPS VIA STARLGIHT

  return (
    <div className="d-flex flex-column gap-6">
      <div className="d-flex flex-column gap-4">
        <div className="text-brand-secondary-400 fw-bold">
          <span>{label}</span>
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
      <PageSelector
        category={category}
        currentPage={currentPage}
        lastPage={lastPage}
      />
    </div>
  );
}
