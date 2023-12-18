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

// TODO! Description

/**
 * Renders a
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
      {articles.map((article) => (
        <Card key={article.slug} article={article} small />
      ))}
    </Row>
  </div>
);
