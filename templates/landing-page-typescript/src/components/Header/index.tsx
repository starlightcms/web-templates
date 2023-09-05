import Image from "next/image";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export default function Header() {
  return (
    <Navbar expand="lg" fixed="top" bg="brand-50">
      <Container>
        <Navbar.Brand>
          <Image
            src="/web-templates.svg"
            alt="Web Templates Logo"
            width={195}
            height={30}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto grid gap-0 column-gap-4">
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link href="#">FAQ</Nav.Link>
            <Button className="bg-brand-500 border-brand-500">Sign up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
