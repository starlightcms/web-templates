import { Accordion, Col, Row } from "react-bootstrap";
import { Entry, Singleton } from "@starlightcms/next-sdk";
import { FAQItem, FAQSingleton } from "@/starlight";

type FAQProps = {
  singleton: Singleton<FAQSingleton>;
  collection: Entry<FAQItem>[];
};

/**
 * Renders an FAQ using the Accordion component from Bootstrap. Each item has
 * a title (the question) and a description (the answer).
 *
 * @see https://react-bootstrap.github.io/docs/components/accordion/
 */
export default function FAQ({ singleton, collection }: FAQProps) {
  const accordionItems = collection.reverse().map((item) => {
    return {
      key: item.slug,
      title: item.data.question,
      body: item.data.answer,
    };
  });

  return (
    <div>
      <h2 className="text-center text-brand-800 fw-bold">
        {singleton.data.title}
      </h2>
      <Row>
        <Col sm={0} lg={3} />
        <Col>
          <Accordion
            defaultActiveKey="0"
            alwaysOpen
            flush
            className="mt-6 border rounded-4 overflow-hidden"
          >
            {accordionItems.map((item) => (
              <Accordion.Item eventKey={item.key} key={item.key}>
                <Accordion.Button className="p-3 shadow-none bg-transparent">
                  <span className="text-brand-800 fw-bold">{item.title}</span>
                </Accordion.Button>
                <Accordion.Body className="border-top border-1">
                  {item.body}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col sm={0} lg={3} />
      </Row>
    </div>
  );
}
