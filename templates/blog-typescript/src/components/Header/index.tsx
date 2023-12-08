import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Singleton, Image as SLImage } from "@starlightcms/next-sdk";
import { Dispatch, SetStateAction } from "react";
import { HeaderSingleton } from "@/starlight";
import burger from "./assets/burger.svg";
import Image from "next/image";

// TODO! SINGLETON - OBLIGATORY!
type HeaderProps = {
  singleton?: Singleton<HeaderSingleton>;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export default function Header({ singleton, setIsSearchOpen }: HeaderProps) {
  // TODO! DO THIS ON LANDING PAGE
  const links = [
    { label: "Tech", href: "#" },
    { label: "Science", href: "#" },
    { label: "Entertainment", href: "#" },
    { label: "Categories", href: "#" },
  ];

  return (
    <Navbar expand="lg" fixed="top" bg="brand-primary-50 z-1">
      <Container>
        <Navbar.Brand>
          {/*<SLImage*/}
          {/*  media={singleton.data.logo}*/}
          {/*  alt="Web Templates Logo"*/}
          {/*  width={195}*/}
          {/*  height={30}*/}
          {/*  priority*/}
          {/*/>*/}
          <div
            style={{ height: "30px", width: "195px" }}
            className="bg-brand-secondary-900 rounded-1"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <Image src={burger} alt={"burger"} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="ms-auto grid gap-0 column-gap-4">
            {/*<Nav.Link href="#">{singleton.data.link_1_label}</Nav.Link>*/}
            {links.map((link) => (
              <Nav.Link
                href={link.href}
                key={link.label}
                className="text-brand-primary-600"
              >
                {link.label}
              </Nav.Link>
            ))}
            <Button className="bg-brand-secondary-500 border-brand-secondary-500 fw-bold lh-4">
              Newsletter
            </Button>
            {/* // TODO! ICON */}
            <Button
              className="bg-transparent border-brand-secondary-500"
              onClick={() => setIsSearchOpen(true)}
            >
              🔍
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
