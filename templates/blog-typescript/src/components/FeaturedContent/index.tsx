import { Entry } from "@starlightcms/next-sdk";
import { Article } from "@/starlight";
import { Row } from "react-bootstrap";
import Card from "@/components/Card";

type FeaturedContentProps = {
  label: string;
  articles: Entry<Article>[];
};

/**
 * Renders 3 Cards as "featured content". It's supposed to be used in the home
 * page and in the Article page.
 *
 * @see Card
 */
export const FeaturedContent = ({ label, articles }: FeaturedContentProps) => (
  <div className="d-flex flex-column gap-4">
    <div className="text-brand-secondary-400 fw-bold">
      <span>{label}</span>
    </div>

    <Row className="d-flex flex-column gap-4">
      {articles.map((article) => (
        <Card key={article.slug} article={article} horizontal />
      ))}
    </Row>
  </div>
);
