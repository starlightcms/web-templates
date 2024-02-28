import { Image, MediaObject } from "@starlightcms/next-sdk";
import { ReactNode } from "react";

type CardProps = {
  text?: string;
  icon?: MediaObject;
  name?: string;
  company?: ReactNode;
};

/**
 * Renders a card-like component with testimonials from your website's users.
 * You can send text (the testimonial), the person's icon, their name and their
 * job information (company and position).
 */
export default function Testimonial({ text, icon, name, company }: CardProps) {
  return (
    <div className="d-flex flex-column lh-lg border rounded-4 p-4 text-lg-start">
      {text && <p className="mb-4 text-gray-600">{text}</p>}
      <div className="d-flex flex-column align-items-center flex-lg-row align-self-lg-start">
        {icon && (
          <Image
            media={icon}
            alt=""
            width={64}
            height={64}
            className="mb-1 rounded-5"
          />
        )}
        <div className="d-flex flex-column align-items-center align-items-lg-start ms-lg-3">
          {name && <span className="text-black fs-6 fw-bold">{name}</span>}
          {company && <span className="text-black fs-6">{company}</span>}
        </div>
      </div>
    </div>
  );
}
