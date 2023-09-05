import Link from "next/link";
import Image from "next/image";
import { Container } from "react-bootstrap";

/**
 * Renders a footer with the website logo, a set columns with navigation
 * links and some credits/copyright information.
 */
export default function Footer() {
  const firstListItems = [
    { href: "https://www.starlight.sh/", label: "Website" },
    { href: "https://www.starlight.sh/#intro", label: "Features" },
    { href: "https://knowledge.starlight.sh/", label: "Knowledge Center" },
  ];

  const secondListItems = [
    {
      href: "https://knowledge.starlight.sh/guia/desenvolvimento/",
      label: "Development Guide",
    },
    { href: "https://react.sdk.starlight.sh/", label: "SDK Docs" },
  ];

  // TODO! Hover colors?

  return (
    <footer className="bg-brand-50 border-top border-brand-100 text-brand-800">
      <Container className="d-flex flex-column gap-4 flex-lg-row justify-content-lg-between p-5">
        <div className="d-flex flex-column gap-4 justify-content-lg-between">
          <Link href="/">
            <Image
              src="/web-templates.svg"
              alt="Web Templates Logo"
              width={195}
              height={30}
            />
          </Link>
          <span>
            © 2023 <b>Your Company</b>
          </span>
        </div>
        <nav>
          <ul className="list-unstyled gap-5 d-flex flex-column flex-lg-row mb-0">
            <li>
              <h4 className="mb-4 fw-bold">Starlight</h4>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {firstListItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      className="text-decoration-none text-brand-800"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <h4 className="mb-4 fw-bold">Documentation</h4>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {secondListItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      className="text-decoration-none text-brand-800"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </Container>
      <div className="d-flex flex-row justify-content-center align-items-center w-100 pt-2 pb-6">
        <span className="d-flex align-items-center gap-1">
          Developed by <b>Your Company</b>
        </span>
        <div className="vr mx-3 bg-brand-200" />
        <span>
          Powered by{" "}
          <a href="https://starlight.sh" target="_blank">
            <Image
              src="/starlight.svg"
              alt="Starlight Logo"
              width={84}
              height={18}
            />
          </a>
        </span>
      </div>
    </footer>
  );
}
