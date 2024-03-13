import { Button, Col, Form, Row } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
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
export default function Signup({ singleton }: SignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(0);

  const signUp = async (event: FormEvent) => {
    setIsSubmitting(true);
    event.preventDefault();

    const response = await fetch(
      "https://submit.starlightcms.io/v2/organizations/starlight/workspaces/landing-page-template/forms/signup",
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
    <Row className="bg-brand-400 text-center text-gray-100 mx-0 rounded-4 overflow-hidden d-lg-flex flex-lg-row">
      <Col className="p-0" sm={12} lg={4}>
        <Image
          media={singleton.data.image}
          alt="Signup image"
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

        <Form
          onSubmit={signUp}
          className="d-flex flex-column justify-content-center align-items-stretch w-100 my-4 mx-0 gap-2 flex-lg-row"
        >
          <Form.Control
            placeholder={singleton.data.email_placeholder}
            className={clsx("p-3 w-100", styles.formInputs)}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            type="email"
            id="email"
          />
          <Button
            type="submit"
            className={clsx(
              "py-3 px-5 bg-brand-100 border-brand-100 fw-bold text-brand-500 flex-shrink-0",
              styles.formInputs,
            )}
            disabled={isSubmitting}
          >
            {singleton.data.button_label}
          </Button>
        </Form>
        {status !== 0 ? (
          <p
            className={clsx(
              "fs-6 mb-3 fw-bold",
              status === 200 ? "text-brand-50" : "text-danger",
            )}
          >
            {status === 200
              ? "Cadastro realizado com sucesso. Obrigado!"
              : "Erro ao tentar realizar o cadastro, tente novamente em alguns minutos."}
          </p>
        ) : (
          <></>
        )}
        <p className="fs-6 mb-0">{singleton.data.footnote}</p>
      </Col>
    </Row>
  );
}
