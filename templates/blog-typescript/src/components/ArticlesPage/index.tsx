import { Entry, StarlightListResponse } from "@starlightcms/next-sdk";
import PageSelector from "@/components/PageSelector";
import { Row } from "react-bootstrap";
import { Article } from "@/starlight";
import Card from "@/components/Card";

type ArticlesPageProps = {
  label: string;
  articleList: StarlightListResponse<Entry<Article>>;
  category: string;
};

/**
 * Renders a page of articles (as Cards) with a small title label and a page
 * selector at the bottom. Requires a label, a list of articles to be
 * displayed, its category (being "page" or a category name), the current page
 * number and the last page number as props.
 *
 * @see Card
 * @see PageSelector
 */
export const ArticlesPage = ({
  label,
  articleList,
  category,
}: ArticlesPageProps) => (
  <div className="d-flex flex-column gap-6">
    <div className="d-flex flex-column gap-4">
      <div className="text-brand-secondary-400 fw-bold">
        <span>{label}</span>
      </div>
      <Row className="d-flex flex-column gap-6">
        {articleList.data.map((article) => (
          <Card key={article.slug} article={article} />
        ))}
      </Row>
    </div>
    <PageSelector
      category={category}
      currentPage={articleList.meta.current_page}
      lastPage={articleList.meta.last_page}
    />
  </div>
);
