import { Image, Entry } from "@starlightcms/next-sdk";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Post } from "@/starlight";
import clsx from "clsx";

type HeroProps = {
  entry: Entry<Post>;
};

// TODO! Texts, image

/**
 * Renders a Hero - the topmost component of the page with the picture,
 * title, description and information of the featured article. It is outside
 * the "Main" component because of its fullscreen (full width) background.
 */
export const Hero = ({ entry }: HeroProps) => {
  // TODO! FIX DATE :(
  return (
    <div className="bg-brand-primary-50">
      <Container className="d-flex flex-column gap-3 px-4 pt-7 pb-5 pb-md-6">
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
          {/*// TODO! */}
          <p className="text-brand-secondary-400 fw-semibold fs-6 my-0">
            By John Doe • November 12th, 2023 at 2:50 PM
          </p>
        </div>
      </Container>
    </div>
  );
};
