import { Button, Col, Form, Row } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { SignupSingleton } from "@/starlight";

type SignupProps = {
  singleton: Singleton<SignupSingleton>;
};

/**
 * Renders a signup (to newsletter) call to action, with an image, some text,
 * an email input and a "Sign up" button.
 */
export default function Signup({ singleton }: SignupProps) {
  // TODO! Fix image size?
  return (
    <Row className="bg-brand-400 text-center text-gray-100 mx-0 rounded-4 overflow-hidden d-lg-flex flex-lg-row">
      <Col className="p-0" sm={12} lg={4}>
        <Image
          media={singleton.data.image}
          alt="TODO"
          className="w-100 h-100"
        />
      </Col>
      <Col
        className="d-flex flex-column justify-content-center align-items-center px-4 py-6 px-lg-6"
        sm={12}
        lg={8}
      >
        <h2 className="mb-2 fw-bold">{singleton.data.title}</h2>
        <p className="lh-lg m-0">{singleton.data.description}</p>

        <div className="d-flex flex-column justify-content-center align-items-stretch w-100 my-4 mx-0 gap-2 flex-lg-row">
          <Form.Control
            placeholder={singleton.data.email_placeholder}
            className="p-3 w-100"
          />
          <Button className="py-3 px-5 bg-brand-100 border-brand-100 fw-bold text-brand-500 flex-shrink-0">
            {singleton.data.button_label}
          </Button>
        </div>
        <p className="fs-6 mb-0">{singleton.data.footnote}</p>
      </Col>
    </Row>
  );
}
