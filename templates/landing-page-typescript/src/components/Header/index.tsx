import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Singleton, Image } from "@starlightcms/next-sdk";
import { HeaderSingleton } from "@/starlight";

type HeaderProps = {
  singleton: Singleton<HeaderSingleton>;
};

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export default function Header({ singleton }: HeaderProps) {
  return (
    <Navbar expand="lg" fixed="top" bg="brand-50">
      <Container>
        <Navbar.Brand>
          <Image
            media={singleton.data.logo}
            alt="Web Templates Logo"
            width={195}
            height={30}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto grid gap-0 column-gap-4">
            <Nav.Link href="#">{singleton.data.link_1_label}</Nav.Link>
            <Nav.Link href="#">{singleton.data.link_2_label}</Nav.Link>
            <Nav.Link href="#">{singleton.data.link_3_label}</Nav.Link>
            <Button className="bg-brand-500 border-brand-500">
              {singleton.data.button_label}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
