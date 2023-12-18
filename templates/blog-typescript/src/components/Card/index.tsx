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
 * Renders a card that renders a post and its information. For its props, you
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

  // TODO! NEEDS TO BE USEMEMO? NOT - REWORK!
  const metadata = useMemo(() => {
    // TODO! DATE ON MEDIUM (MOBILE!)
    // TODO! "... ÀS [XX:XX]" ESTATICO NA HORA

    const date = article.published_at
      ? new Date(Date.parse(article.published_at))
      : undefined;

    // TODO!

    return "";
    // return new Intl.DateTimeFormat("pt-BR", {
    //   day: "numeric",
    //   month: small ? "short" : "long",
    //   year: small ? undefined : "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   timeZone: "America/Fortaleza",
    // }).format(date);
  }, [article.published_at, small]);

  return (
    <Link
      href={article.slug ? `/article/${article.slug}` : "/article/testing"}
      className={clsx(
        "d-flex flex-row position-relative text-decoration-none",
        cardClass === "defaultVertical" && "flex-column",
        styles[cardClass],
      )}
    >
      <div
        className={clsx(
          "d-flex align-items-center justify-content-center flex-shrink-0 bg-brand-secondary-900 overflow-hidden position-relative rounded-2",
          styles.imageContainer,
        )}
      >
        <Image
          media={article.data.image}
          alt={article.data.image.alt}
          className="position-absolute w-100 h-100 object-fit-cover"
        />
        {/*<img*/}
        {/*  className="position-absolute w-100 h-100 object-fit-cover"*/}
        {/*  alt="test"*/}
        {/*  src="https://cards.scryfall.io/art_crop/front/4/2/42232ea6-e31d-46a6-9f94-b2ad2416d79b.jpg?1565989372"*/}
        {/*  // src="https://www.mtgnexus.com/img/gallery/6473-invasion-of-mercadia.jpg"*/}
        {/*  // src="https://cards.scryfall.io/art_crop/front/4/0/407d6723-bf58-403e-b2ac-ba52c51d356f.jpg?1682715363"*/}
        {/*/>*/}

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
        <p className="text-brand-secondary-400 mb-0 fw-semibold overflow-hidden">
          {metadata}
        </p>
      </div>
    </Link>
  );
}
