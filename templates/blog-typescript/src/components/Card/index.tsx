import { Image, MediaObject } from "@starlightcms/next-sdk";
import styles from "./styles.module.scss";
import { useMemo } from "react";
import clsx from "clsx";

type CardProps = {
  image?: MediaObject;
  title: string;
  description?: string;
  label?: string;
  info?: string;
  small?: boolean;
  horizontal?: boolean;
  rank?: number;
};

/**
 * Renders a card with many props to represent a post. You can send an image,
 * a title, a text description, a category label, some info (author and date),
 * booleans for creating a "small" and/or "horizontal" card and a number for
 * the "post rank" among the popular posts (that appears on the top-left).
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
  image,
  title,
  description,
  label,
  info,
  small = false,
  horizontal = false,
  rank,
}: CardProps) {
  const cardClass = useMemo(() => {
    if (small) return "small";
    if (horizontal) return "defaultHorizontal";
    return "defaultVertical";
  }, [small, horizontal]);

  return (
    <div
      className={clsx(
        "d-flex flex-row position-relative",
        cardClass === "defaultVertical" && "flex-column",
        styles[cardClass],
      )}
    >
      <div
        className={clsx(
          "d-flex align-items-center justify-content-center flex-shrink-0 bg-brand-secondary-900 position-relative rounded-2",
          styles.imageContainer,
        )}
      >
        <img
          className="position-absolute w-100 h-100 object-fit-cover rounded-2"
          alt="test"
          src="https://cards.scryfall.io/art_crop/front/4/2/42232ea6-e31d-46a6-9f94-b2ad2416d79b.jpg?1565989372"
          // src="https://www.mtgnexus.com/img/gallery/6473-invasion-of-mercadia.jpg"
          // src="https://cards.scryfall.io/art_crop/front/4/0/407d6723-bf58-403e-b2ac-ba52c51d356f.jpg?1682715363"
        />

        {label !== undefined && (
          <div
            className={clsx(
              "bg-brand-secondary-200 text-brand-secondary-800 fw-bold position-absolute py-2 lh-1 rounded-5",
              styles.label,
            )}
          >
            {label}
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
            {title}
          </span>
          {description !== undefined && cardClass !== "small" && (
            <p className="text-brand-primary-700 mb-0">{description}</p>
          )}
        </div>
        <p className="text-brand-secondary-400 mb-0 fw-semibold overflow-hidden">
          {info}
        </p>
      </div>
    </div>
  );
}
