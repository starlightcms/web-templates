import { Entry, Image } from "@starlightcms/next-sdk";
import styles from "./styles.module.scss";
import { Article } from "@/starlight";
import { useMemo } from "react";
import Link from "next/link";
import clsx from "clsx";

type CardProps = {
  article: Entry<Article>;
  small?: boolean;
  horizontal?: boolean;
  rank?: number;
};

/**
 * Renders a card that contains a post and its information. For its props, you
 * can send an article, booleans for creating a "small" and/or "horizontal"
 * card and a number for the "post rank" among the popular posts (that appears
 * on the top-left).
 *
 * A couple of notes some props:
 * - The "small" prop will take precedence over the "horizontal" prop - i.e.
 * there are no cards that are both small and vertical, they'll be small and
 * horizontal.
 * - On smaller screens, "horizontal" (non-small) cards and "small" cards are
 * the same size.
 * - The "number" prop will only consider numbers from 1 to 5 (if they're on a
 * list, ideally you should send index + 1).
 */
export default function Card({
  article,
  small = false,
  horizontal = false,
  rank,
}: CardProps) {
  const cardClass = useMemo(() => {
    if (small) return "small";
    if (horizontal) return "defaultHorizontal";
    return "defaultVertical";
  }, [small, horizontal]);

  const dateObject = article.published_at
    ? new Date(Date.parse(article.published_at))
    : undefined;

  // 15 de Janeiro de 2024
  const articleFullDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  // 15 de Jan.
  const articleShortDate = new Intl.DateTimeFormat("pt-BR", {
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
        "d-flex flex-row position-relative text-decoration-none",
        cardClass === "defaultVertical" && "flex-column",
        styles[cardClass],
      )}
    >
      <div
        className={clsx(
          "d-flex align-items-center justify-content-center flex-shrink-0 position-relative",
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

        {rank !== undefined && (
          <div
            className={clsx(
              `d-flex justify-content-center align-items-center bg-brand-secondary-${
                600 - rank * 100
              } fw-bold position-absolute rounded-5`,
              rank > 3 ? "text-brand-secondary-700" : "text-white",
              styles.number,
            )}
          >
            {rank}
          </div>
        )}
      </div>

      <div
        className={clsx(
          "d-flex flex-column justify-content-center px-0",
          styles.texts,
        )}
      >
        <div
          className={clsx(
            "d-flex flex-column gap-2",
            cardClass === "defaultVertical" && "gap-3",
          )}
        >
          <span className="text-brand-primary-600 fw-bold overflow-hidden">
            {article.title}
          </span>
          {article.data.description !== undefined && cardClass !== "small" && (
            <p className="text-brand-primary-700 mb-0">
              {article.data.description}
            </p>
          )}
        </div>

        {cardClass !== "small" && (
          <p
            className={clsx(
              "text-brand-secondary-400 mb-0 fw-semibold overflow-hidden",
              cardClass === "defaultHorizontal" && "d-none d-md-block",
            )}
          >
            {articleFullDate} às {articleTime}
          </p>
        )}
        {cardClass !== "defaultVertical" && (
          <p
            className={clsx(
              "text-brand-secondary-400 mb-0 fw-semibold overflow-hidden",
              cardClass === "defaultHorizontal" && "d-block d-md-none",
            )}
          >
            {articleShortDate} às {articleTime}
          </p>
        )}
      </div>
    </Link>
  );
}
