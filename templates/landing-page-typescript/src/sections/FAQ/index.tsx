import { Accordion, Col, Row } from "react-bootstrap";

// TODO! Description?
export default function FAQ() {
  const accordionItems = [
    {
      key: "0",
      title: "Accordion Item #1",
      body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
    },
    {
      key: "1",
      title: "Accordion Item #2",
      body: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
    },
    {
      key: "2",
      title: "Accordion Item #3",
      body: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
    },
    {
      key: "3",
      title: "Accordion Item #4",
      body: "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
    },
    {
      key: "4",
      title: "Accordion Item #5",
      body: "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
    },
  ];

  return (
    <div>
      <h2 className="text-center text-brand-800 fw-bold">
        Questions & answers
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
