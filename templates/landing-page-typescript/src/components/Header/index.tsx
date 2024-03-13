import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Singleton, Image as SLImage } from "@starlightcms/next-sdk";
import { HeaderSingleton } from "@/starlight";
import burger from "./assets/burger.svg";
import Image from "next/image";

type HeaderProps = {
  singleton: Singleton<HeaderSingleton>;
};

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export default function Header({ singleton }: HeaderProps) {
  const links = [
    { label: singleton.data.link_1_label, href: "#" },
    { label: singleton.data.link_2_label, href: "#" },
    { label: singleton.data.link_3_label, href: "#" },
  ];

  return (
    <Navbar expand="lg" fixed="top" bg="brand-50">
      <Container>
        <Navbar.Brand>
          <SLImage
            media={singleton.data.logo}
            alt="Web Templates Logo"
            width={195}
            height={30}
            priority
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <Image src={burger} alt={"burger"} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="ms-auto grid gap-0 column-gap-4">
            {links.map((link) => (
              <Nav.Link key={link.label} href={link.href}>
                {link.label}
              </Nav.Link>
            ))}
            <Button className="bg-brand-500 border-brand-500">
              {singleton.data.button_label}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
