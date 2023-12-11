import { Container } from "react-bootstrap";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

/**
 * Renders the main content of the page and places its children inside a
 * Container component.
 */
export const Main = ({ children }: LayoutProps) => (
  <Container as="main" className="d-flex flex-column gap-7 py-5 py-md-6">
    {children}
  </Container>
);
