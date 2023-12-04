import { Container } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeroSingleton } from "@/starlight";

// TODO! SINGLETON - OBLIGATORY!
type HeroProps = {
  singleton: Singleton<HeroSingleton>;
};

// TODO! Texts, image

/**
 * Renders a Hero - the topmost component of the page with the picture,
 * title, description and information of the featured article. It is outside
 * the "Main" component because of its fullscreen (full width) background.
 */
export default function Hero({ singleton }: HeroProps) {
  return (
    <div className="bg-brand-primary-50">
      <Container className="px-4 py-7 d-flex flex-column gap-3">
        <p className="text-brand-secondary-400 fw-bold fs-6 mb-0">
          Featured Article
        </p>
        <div
          style={{ height: "380px" }}
          className="w-100 bg-brand-secondary-900 rounded-4"
        />
        <div>
          <h1 className="text-brand-primary-600 fw-bold lh-1">
            Travelling as a way of self-discovery and progress
          </h1>
          <p className="text-brand-primary-700 fs-5 mt-2 mb-3">
            Visiting places you’ve never been before might be the next big step
            in your journey.
          </p>
          <p className="text-brand-secondary-400 fw-semibold fs-6 my-0">
            By John Doe • November 12th, 2023 at 2:50 PM
          </p>
        </div>
      </Container>
    </div>
  );
}
