import { Image, MediaObject } from "@starlightcms/next-sdk";
import { Button, Col } from "react-bootstrap";
import { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  icon?: MediaObject;
  title?: string;
  text?: string;
  button?: ReactNode;
  borderless?: boolean;
};

/**
 * Renders a card with many optional props. You can send an icon, a title, a
 * text description, a button label and a borderless boolean (defaulted as
 * false) as props.
 */
export default function Card({
  icon,
  title,
  text,
  button,
  borderless = false,
}: CardProps) {
  return (
    <Col
      className={clsx(
        "text-center align-items-center lh-lg text-lg-start d-lg-flex flex-lg-column justify-content-lg-between",
        borderless === false && "border rounded-4 p-4",
      )}
    >
      <div className="theme-card">
        {icon && <Image media={icon} alt="" className="mb-3" />}
        {title && <h4 className="text-gray-800 fw-bold">{title}</h4>}
        {text && (
          <p className={clsx("text-gray-700 mb-0", button && "mb-1")}>{text}</p>
        )}
      </div>
      {button && (
        <Button className="bg-brand-100 border-brand-100 text-brand-500 fw-bold mt-3 align-self-lg-start">
          {button}
        </Button>
      )}
    </Col>
  );
}
