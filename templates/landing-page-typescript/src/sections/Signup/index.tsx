import Image from "next/image";
import temp from "./assets/temp.png";
import { Button, Col, Form, Row } from "react-bootstrap";

// TODO! Description?
export default function Signup() {
  // TODO! Fix image size?
  return (
    <Row className="bg-brand-400 text-center text-gray-100 mx-0 rounded-4 overflow-hidden d-lg-flex flex-lg-row">
      <Col className="p-0" sm={12} lg={4}>
        <Image src={temp} alt="TODO" className="w-100 h-100" />
      </Col>
      <Col
        className="d-flex flex-column justify-content-center align-items-center px-4 py-6 px-lg-6"
        sm={12}
        lg={8}
      >
        <h2 className="mb-2 fw-bold">Sign up to our newsletter</h2>
        <p className="lh-lg m-0">
          Suspendisse id justo ac magna volutpat varius. Ut in dignissim purus.
          Ut efficitur fermentum sapien vitae scelerisque. Nullam lobortis lorem
          et eros sollicitudin sagittis.
        </p>

        {/* TODO! Ajeitar isso... */}
        <div className="d-flex flex-column justify-content-center align-items-stretch w-100 my-4 mx-0 gap-2 flex-lg-row">
          <Form.Control placeholder="E-mail address" className="p-3 w-100" />
          <Button className="py-3 px-5 bg-brand-100 border-brand-100 fw-bold text-brand-500 flex-shrink-0">
            Sign up
          </Button>
        </div>
        <p className="fs-6 mb-0">
          Aenean lobortis luctus tellus, sit amet sodales odio consequat eu.
        </p>
      </Col>
    </Row>
  );
}
