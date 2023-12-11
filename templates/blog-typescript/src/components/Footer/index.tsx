import { Singleton } from "@starlightcms/next-sdk";
import { FooterSingleton } from "@/starlight";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import logo from "./assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// TODO! SINGLETON - OBLIGATORY!
type FooterProps = {
  singleton?: Singleton<FooterSingleton>;
};

// TODO! MODIFICAR COMPONENTE NO LANDING PAGE...

// TODO! LINKS, IMAGENS, TEXTOS DO STARLIGHT

/**
 * Renders a footer with the website logo, a set columns with navigation
 * links and some credits/copyright information.
 */
export default function Footer({ singleton }: FooterProps) {
  const firstListItems = [
    { href: "https://google.com/", label: "Tech" },
    { href: "https://google.com/", label: "Science" },
    { href: "https://google.com/", label: "Entertainment" },
  ];

  const secondListItems = [
    { href: "https://www.starlight.sh/", label: "Website" },
    { href: "https://www.starlight.sh/#intro", label: "Features" },
    {
      href: "https://knowledge.starlight.sh/",
      label: "Knowledge Center",
    },
  ];

  const thirdListItems = [
    {
      href: "https://knowledge.starlight.sh/guia/desenvolvimento/",
      label: "Development Guide",
    },
    { href: "https://react.sdk.starlight.sh/", label: "SDK Docs" },
  ];

  // TODO! DO THIS ON LANDING PAGE TEMPLATE
  const lists = [
    { name: "Categories", items: firstListItems },
    { name: "Starlight", items: secondListItems },
    { name: "Documentation", items: thirdListItems },
  ];

  return (
    <footer className="bg-brand-primary-50 border-top border-brand-100 text-brand-primary-700">
      <Container className="d-flex flex-column gap-4 flex-md-row justify-content-md-between pt-5 px-5">
        <div className="d-flex flex-column gap-4 justify-content-md-between">
          <Link href="/">
            {/*<Image*/}
            {/*  media={singleton.data.website_logo}*/}
            {/*  alt="Web Templates Logo"*/}
            {/*  width={195}*/}
            {/*  height={30}*/}
            {/*/>*/}
            <div
              style={{ height: "30px", width: "195px" }}
              className="bg-brand-secondary-900 rounded-1"
            />
          </Link>
          <span>
            {/*© {singleton.data.year} <b>{singleton.data.company_name}</b>*/}
            <b>© 2023 Your Company</b>
          </span>
        </div>
        <nav>
          <ul className="list-unstyled gap-5 mb-0 d-flex flex-column flex-md-row gap-lg-8">
            {lists.map((list) => (
              <li key={list.name}>
                <h6 className="mb-4 fw-bold">{list.name}</h6>
                <ul className="list-unstyled d-flex flex-column gap-2">
                  {list.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        className="text-decoration-none text-brand-primary-600"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="d-flex flex-column justify-content-center align-items-center flex-md-row w-100 py-6 gap-3">
        <span className="d-flex align-items-center gap-1">
          {/*{singleton.data.developed_by} <b>{singleton.data.company_name}</b>*/}
          Developed by <b>Your Company</b>
        </span>
        <div className={clsx("bg-brand-primary-100", styles.divider)} />
        <div>
          <span className="me-2">Powered by</span>
          <a href="https://starlight.sh" target="_blank">
            <Image src={logo} alt={"burger"} />
          </a>
        </div>
      </div>
    </footer>
  );
}
