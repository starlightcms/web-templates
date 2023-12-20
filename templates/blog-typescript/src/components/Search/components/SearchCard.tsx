import { Entry, Image } from "@starlightcms/next-sdk";
import styles from "./styles.module.scss";
import { Article } from "@/starlight";
import Link from "next/link";
import clsx from "clsx";

type SearchCardProps = {
  article: Entry<Article>;
  active: boolean;
  cardRef: (element: HTMLAnchorElement) => HTMLAnchorElement;
};

/**
 * Renders a card that contains a searched post and its information. For its
 * props, you can send an article, a boolean that defines if it's "active" or
 * "inactive" in the search and a ref that will be placed in the card.
 */
export const SearchCard = ({ article, active, cardRef }: SearchCardProps) => {
  const dateObject = article.published_at
    ? new Date(Date.parse(article.published_at))
    : undefined;

  // 15 de Jan.
  const articleDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  // 10:35
  const articleTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  return (
    <Link
      href={`/article/${article.slug}`}
      className={clsx(
        "d-flex flex-row position-relative gap-3 w-100 rounded-2 text-decoration-none",
        active && "bg-brand-secondary-200",
        styles.searchCard,
      )}
      ref={cardRef}
    >
      <div
        className={clsx(
          "d-flex align-items-center justify-content-center flex-shrink-0 position-relative rounded-2",
          styles.imageContainer,
        )}
      >
        <Image
          media={article.data.image}
          alt={article.data.image.alt}
          className="position-absolute w-100 h-100 object-fit-cover rounded-2"
        />

        {article.category !== null && (
          <div
            className={clsx(
              "bg-brand-secondary-200 text-brand-secondary-800 fw-bold position-absolute py-2 lh-1 rounded-5",
              styles.label,
            )}
          >
            {article.category.title}
          </div>
        )}
      </div>

      <div
        className={clsx(
          "d-flex flex-column justify-content-center px-0",
          styles.texts,
        )}
      >
        <div className="d-flex flex-column gap-2">
          <span className="text-brand-primary-600 fw-bold overflow-hidden">
            {article.title}
          </span>
        </div>
        <p className="text-brand-secondary-400 mb-0 fw-semibold overflow-hidden">
          {articleDate} às {articleTime}
        </p>
      </div>
    </Link>
  );
};
