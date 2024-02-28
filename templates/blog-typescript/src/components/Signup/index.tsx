import { Singleton, Image } from "@starlightcms/next-sdk";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SignupSingleton } from "@/starlight";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type SignupProps = {
  singleton: Singleton<SignupSingleton>;
};

/**
 * Renders a signup (to newsletter) call to action, with an image, some text,
 * an email input and a "Sign up" button.
 */
export const Signup = ({ singleton }: SignupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(0);

  const signUp = async (event: FormEvent) => {
    setIsSubmitting(true);
    event.preventDefault();

    const response = await fetch(
      "https://submit.starlightcms.io/v2/organizations/starlight/workspaces/blog-template/forms/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    setIsSubmitting(false);
    setStatus(response.status);

    if (response.status === 200) setEmail("");
  };

  return (
    <Row
      className="d-flex bg-brand-secondary-100 text-center text-gray-100 mx-0 rounded-4 overflow-hidden"
      id="newsletter"
    >
      <Col
        className="d-flex p-0 overflow-hidden justify-content-center align-items-center"
        sm={12}
        lg={6}
      >
        <div
          className="d-flex flex-shrink-0 h-100 w-100 align-items-center justify-content-center position-relative"
          style={{ minHeight: "20rem" }}
        >
          <Image
            className="position-absolute w-100 h-100 object-fit-cover rounded-2"
            media={singleton.data.image}
            alt={singleton.data.image.alt}
          />
        </div>
      </Col>
      <Col
        className="d-flex flex-column justify-content-center align-items-center px-4 py-6 px-md-4"
        sm={12}
        lg={6}
      >
        <h2 className="mb-2 fw-bold text-brand-secondary-500">
          {singleton.data.title}
        </h2>
        <p className="lh-lg m-0 text-brand-secondary-800">
          {singleton.data.description}
        </p>
        <Form
          onSubmit={signUp}
          className="d-flex flex-column justify-content-center align-items-stretch w-100 my-4 mx-0 gap-2"
        >
          <Form.Control
            placeholder={singleton.data.placeholder}
            className={clsx(
              "p-3 w-100 border-2 border-brand-secondary-500 text-brand-secondary-800",
              styles.formInputs,
            )}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            type="email"
            id="email"
          />
          <Button
            type="submit"
            className={clsx(
              "py-3 px-5 bg-brand-secondary-500 border-brand-secondary-500 fw-bold text-white flex-shrink-0",
              styles.formInputs,
            )}
            disabled={isSubmitting}
          >
            {singleton.data.signup}
          </Button>
        </Form>
        {status !== 0 ? (
          <p
            className={clsx(
              "fs-6 mb-3 fw-bold",
              status === 200 ? "text-brand-secondary-500" : "text-danger",
            )}
          >
            {status === 200
              ? "Cadastro realizado com sucesso. Obrigado!"
              : "Erro ao tentar realizar o cadastro, tente novamente em alguns minutos."}
          </p>
        ) : (
          <></>
        )}
        <p className="fs-6 mb-0 text-brand-secondary-800">
          {singleton.data.footnote}
        </p>
      </Col>
    </Row>
  );
};
