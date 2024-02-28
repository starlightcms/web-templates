import { Image, Entry } from "@starlightcms/next-sdk";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Article } from "@/starlight";
import clsx from "clsx";
import Link from "next/link";

type HeroProps = {
  entry: Entry<Article>;
};

/**
 * Renders a Hero - the topmost component of the page with the picture,
 * title, description and information of the featured article. It is outside
 * the "Main" component because of its fullscreen (full width) background.
 */
export const Hero = ({ entry }: HeroProps) => {
  const dateObject = entry.published_at
    ? new Date(Date.parse(entry.published_at))
    : undefined;

  const entryDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  const entryTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Fortaleza",
  }).format(dateObject);

  const entryMetadata = `Por ${entry.author.name} • ${entryDate} às ${entryTime}`;

  return (
    <div className="bg-brand-primary-50">
      <Container className="d-flex pt-7 pb-5 pb-md-6">
        <Link
          href={`/article/${entry.slug}`}
          className="d-flex flex-column gap-3 text-decoration-none"
        >
          <p className="text-brand-secondary-400 fw-bold fs-6 mb-0">
            Artigo em Destaque
          </p>
          <div
            className={clsx(
              "d-flex align-items-center justify-content-center flex-shrink-0 bg-brand-secondary-200 position-relative overflow-hidden rounded-4",
              styles.imageContainer,
            )}
          >
            <Image
              media={entry.data.image}
              alt={entry.data.image.alt}
              className="position-absolute w-100 h-100 object-fit-cover"
            />

            {entry.category !== null && (
              <div
                className={clsx(
                  "bg-brand-secondary-200 text-brand-secondary-800 fw-bold position-absolute py-2 lh-1 rounded-5",
                  styles.label,
                )}
              >
                {entry.category.title}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-brand-primary-600 fw-bold lh-1">
              {entry.data.title}
            </h1>
            <p className="text-brand-primary-700 fs-5 mt-2 mb-3">
              {entry.data.description}
            </p>
            <p className="text-brand-secondary-400 fw-semibold fs-6 my-0">
              {entryMetadata}
            </p>
          </div>
        </Link>
      </Container>
    </div>
  );
};
