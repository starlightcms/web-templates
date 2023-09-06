import Testimonial from "@/components/Testimonial";
import temp from "./assets/temp.png";

/**
 * Renders 2 Testimonial components with testimonials from your app's clients.
 *
 * @see Testimonial
 */
export default function Testimonials() {
  return (
    <div className="text-center text-brand-800">
      <h2 className="fw-bold">Testimonials</h2>
      <div className="d-flex flex-column gap-4 mt-6 flex-lg-row">
        <Testimonial
          text="“All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.”"
          icon={temp.src}
          name="Jane Doe"
          company="CEO at Somewhere Inc."
        />
        <Testimonial
          text="“All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.”"
          icon={temp.src}
          name="Jane Doe"
          company="CEO at Somewhere Inc."
        />
      </div>
    </div>
  );
}
