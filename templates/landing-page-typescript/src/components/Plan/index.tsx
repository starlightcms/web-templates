import { ReactNode } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import clsx from "clsx";
import {
  ListBlock,
  VisualContent,
  VisualData,
  VisualDataBlock,
} from "@starlightcms/next-sdk";

type CustomListProps = VisualDataBlock<ListBlock> & {
  popular?: boolean;
};

function CustomList({ data, popular }: CustomListProps) {
  return (
    <ListGroup variant="flush">
      {data.items.map((item, index) => (
        <ListGroup.Item
          key={index}
          className={clsx(
            "text-gray-600 border-brand-100 border-bottom",
            popular && "border-brand-500",
          )}
        >
          {item.content}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

type PlanProps = {
  title?: string;
  popular?: boolean;
  description?: string;
  features?: VisualData;
  signupHref?: string;
};

/**
 * Renders a card-like component with payment plans for your website. As props,
 * you can send a title, a description, a list of features (strings), a signup
 * link and a boolean that defines the most popular plan (it has a different
 * border color and also a bootstrap Badge).
 *
 * @see https://react-bootstrap.github.io/docs/components/badge/
 */
export default function Plan({
  title,
  popular,
  description,
  features,
  signupHref,
}: PlanProps) {
  return (
    <Card
      className={clsx(
        "text-start lh-lg border rounded-4 border-brand-100 overflow-hidden",
        popular && "border-brand-500",
      )}
    >
      <CardHeader
        className={clsx(
          "p-4 bg-transparent border-brand-100",
          popular && "border-brand-500",
        )}
      >
        <div className="d-flex flex-row align-items-center">
          <h2 className="text-brand-800 me-3">{title}</h2>
          {popular && (
            <Badge className="bg-brand-50 text-brand-500">Most popular</Badge>
          )}
        </div>
        <p className="text-gray-600 mb-0">{description}</p>
      </CardHeader>
      <div className="flex-grow-1">
        <VisualContent
          content={features}
          components={{
            list: (props) => <CustomList popular={popular} {...props} />,
          }}
        />
      </div>
      <Card.Body
        className={clsx(
          "text-center bg-brand-100 flex-grow-0",
          popular && "bg-brand-500",
        )}
      >
        <a
          href={signupHref}
          className={clsx(
            "text-decoration-none text-brand-500 fw-bold",
            popular && "text-white",
          )}
        >
          Sign up
        </a>
      </Card.Body>
    </Card>
  );
}
