import { Button, Col } from "react-bootstrap";
import { ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";

type CardProps = {
  icon?: string;
  title?: string;
  text?: string;
  button?: ReactNode;
  borderless?: boolean;
};

// TODO! Description?
export default function Card({
  icon,
  title,
  text,
  button,
  borderless = false,
}: CardProps) {
  // TODO! Margin not matching up on borderless (see FeaturesRight)
  return (
    <Col
      className={clsx(
        "text-center align-items-center lh-lg text-lg-start d-lg-flex flex-lg-column justify-content-lg-between",
        borderless === false && "border rounded-4 p-4",
      )}
    >
      <div className="theme-card">
        {icon && <Image src={icon} alt="" className="mb-3" />}
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
