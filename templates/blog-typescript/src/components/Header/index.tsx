import { Singleton, Image as SLImage } from "@starlightcms/next-sdk";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useSearchContext } from "@/components/SearchContext";
import { HeaderSingleton } from "@/starlight";
import burger from "./assets/burger.svg";
import search from "./assets/search.svg";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  singleton: Singleton<HeaderSingleton>;
};

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export default function Header({ singleton }: HeaderProps) {
  // TODO! DO THIS ON LANDING PAGE
  const links = [
    { label: singleton.data.tech, href: "/tech" },
    { label: singleton.data.science, href: "/science" },
    { label: singleton.data.entertainment, href: "/entertainment" },
    { label: singleton.data.about, href: "/about" },
  ];

  const { setIsSearchOpen } = useSearchContext();

  return (
    <Navbar expand="lg" fixed="top" bg="brand-primary-50 z-1">
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <SLImage
              media={singleton.data.logo}
              alt="Web Templates Logo"
              width={195}
              height={30}
              priority
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
          <Image src={burger} alt="burger" />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="ms-auto grid gap-0 column-gap-4">
            {links.map((link) => (
              <Nav.Link
                href={link.href}
                key={link.label}
                className="text-brand-primary-600"
              >
                {link.label}
              </Nav.Link>
            ))}
            <Link href="/#newsletter">
              <Button className="bg-brand-secondary-500 border-brand-secondary-500 fw-bold lh-4">
                {singleton.data.newsletter}
              </Button>
            </Link>
            <Button
              className="d-flex align-items-center bg-transparent border-brand-secondary-500 px-3"
              onClick={() => setIsSearchOpen(true)}
            >
              <Image src={search} alt="search" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
