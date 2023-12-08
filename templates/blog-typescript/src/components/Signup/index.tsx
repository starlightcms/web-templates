import { Singleton, Image, getMediaFile } from "@starlightcms/next-sdk";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SignupSingleton } from "@/starlight";
import { FormEvent, useState } from "react";
import clsx from "clsx";

type SignupProps = {
  singleton?: Singleton<SignupSingleton>;
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

    // TODO! URL FOR RESPONSE!
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

  // TODO! OPACITY TRANSITION
  return (
    <Row className="bg-brand-secondary-100 text-center text-gray-100 mx-0 rounded-4 overflow-hidden d-md-flex flex-md-row">
      <Col
        className="p-0 overflow-hidden"
        sm={12}
        lg={6}
        style={{
          // backgroundImage: `url(${getMediaFile(singleton.data.image).path})`,
          backgroundImage: `url(https://cards.scryfall.io/art_crop/front/4/2/42232ea6-e31d-46a6-9f94-b2ad2416d79b.jpg?1565989372)`,
          backgroundSize: "cover",
        }}
      >
        {/*<Image*/}
        {/*  media={singleton.data.image}*/}
        {/*  alt="TODO"*/}
        {/*  className="h-100 w-auto object-fit-fill"*/}
        {/*/>*/}
      </Col>
      <Col
        className="d-flex flex-column justify-content-center align-items-center px-4 py-6 px-md-4"
        sm={12}
        lg={6}
      >
        <h2 className="mb-2 fw-bold text-brand-secondary-500">
          Sign up to our newsletter
        </h2>
        <p className="lh-lg m-0 text-brand-secondary-800">
          Suspendisse id justo ac magna volutpat varius. Ut in dignissim purus.
          Ut efficitur fermentum sapien vitae scelerisque. Nullam lobortis lorem
          et eros sollicitudin sagittis.
        </p>
        <Form
          onSubmit={signUp}
          className="d-flex flex-column justify-content-center align-items-stretch w-100 my-4 mx-0 gap-2"
        >
          <Form.Control
            placeholder="E-mail address"
            className="p-3 w-100 border-2 border-brand-secondary-500 text-brand-secondary-800"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            type="email"
            id="email"
          />
          <Button
            type="submit"
            className="py-3 px-5 bg-brand-secondary-500 border-brand-secondary-500 fw-bold text-white flex-shrink-0"
            disabled={isSubmitting}
          >
            Sign up
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
        <p className="fs-6 mb-0 text-brand-secondary-800">
          Aenean lobortis luctus tellus, sit amet sodales odio consequat eu.
        </p>
      </Col>
    </Row>
  );
};
