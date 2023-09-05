import { Button } from "react-bootstrap";
import { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";

type CardProps = {
  text?: string;
  icon?: string;
  name?: string;
  company?: ReactNode;
};

// TODO! Description?
export default function Testimonial({ text, icon, name, company }: CardProps) {
  return (
    <div className="d-flex flex-column lh-lg border rounded-4 p-4 text-lg-start">
      {text && <p className="mb-4 text-gray-600">{text}</p>}
      <div className="d-flex flex-column align-items-center flex-lg-row align-self-lg-start">
        {icon && (
          <Image
            src={icon}
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
