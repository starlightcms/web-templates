import { Entry } from "@starlightcms/next-sdk";
import styles from "./styles.module.scss";
import { Article } from "@/starlight";
import { Row } from "react-bootstrap";
import Card from "@/components/Card";
import clsx from "clsx";

type PopularArticlesProps = {
  label: string;
  articles: Entry<Article>[];
};

// TODO! LABEL SHOULD BE STATIC?
/**
 * Renders a list of small Cards that will serve as a list of the most viewed
 * articles. It receives a label (that will be rendered at the top of the
 * component) and the list of articles to be displayed.
 *
 * @see Card
 */
export const PopularArticles = ({ label, articles }: PopularArticlesProps) => (
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
      {articles.map((article, index) => (
        <Card key={article.slug} article={article} rank={index + 1} small />
      ))}
    </Row>
  </div>
);
