import {
  TestimonialsSingleton,
  Testimonial as TestimonialType,
} from "@/starlight";
import { Entry, Singleton } from "@starlightcms/next-sdk";
import Testimonial from "@/components/Testimonial";

type TestimonialsProps = {
  singleton: Singleton<TestimonialsSingleton>;
  collection: Entry<TestimonialType>[];
};

/**
 * Renders 2 Testimonial components with testimonials from your app's clients.
 *
 * @see Testimonial
 */
export default function Testimonials({
  singleton,
  collection,
}: TestimonialsProps) {
  return (
    <div className="text-center text-brand-800">
      <h2 className="fw-bold">{singleton.data.title}</h2>
      <div className="d-flex flex-column gap-4 mt-6 flex-lg-row">
        {collection.map((item) => (
          <Testimonial
            text={item.data.description}
            icon={item.data.icon}
            name={item.data.name}
            company={item.data.company}
            key={item.slug}
          />
        ))}
      </div>
    </div>
  );
}
