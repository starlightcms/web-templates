import { Singleton, Image as SLImage } from "@starlightcms/next-sdk";
import { FooterSingleton } from "@/starlight";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import logo from "./assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type FooterProps = {
  singleton: Singleton<FooterSingleton>;
};

// TODO! MODIFICAR COMPONENTE NO LANDING PAGE! VER ESTILOS!

/**
 * Renders a footer with the website logo, a set columns with navigation
 * links and some credits/copyright information.
 */
export default function Footer({ singleton }: FooterProps) {
  const firstListItems = [
    { href: "/tech", label: singleton.data.tech },
    { href: "/science", label: singleton.data.science },
    { href: "/entertainment", label: singleton.data.entertainment },
  ];

  const secondListItems = [
    { href: "https://www.starlight.sh/", label: singleton.data.website },
    { href: "https://www.starlight.sh/#intro", label: singleton.data.features },
    {
      href: "https://knowledge.starlight.sh/",
      label: singleton.data.knowledge_center,
    },
  ];

  const thirdListItems = [
    {
      href: "https://knowledge.starlight.sh/guia/desenvolvimento/",
      label: singleton.data.development_guide,
    },
    { href: "https://react.sdk.starlight.sh/", label: singleton.data.sdk_docs },
  ];

  // TODO! DO THIS ON LANDING PAGE TEMPLATE
  const lists = [
    { name: singleton.data.categories, items: firstListItems },
    { name: singleton.data.starlight, items: secondListItems },
    { name: singleton.data.documentation, items: thirdListItems },
  ];

  return (
    <footer className="bg-brand-primary-50 border-top border-brand-100 text-brand-primary-700">
      <Container className="d-flex flex-column gap-4 flex-md-row justify-content-md-between pt-5 px-5">
        <div className="d-flex flex-column gap-4 justify-content-md-between">
          <Link href="/">
            <SLImage
              media={singleton.data.logo}
              alt="Web Templates Logo"
              width={195}
              height={30}
            />
          </Link>
          <span>
            {/* // TODO! REPLACE THIS TEXT - DO ON TEMPLATE.JSON! Search discord: "basicamente adicionar essa ação" */}
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
          Desenvolvido por <b>Your Company</b>
        </span>
        <div className={clsx("bg-brand-primary-100", styles.divider)} />
        <div>
          <span className="me-2">Feito com</span>
          <a href="https://starlight.sh" target="_blank">
            <Image src={logo} alt={"burger"} />
          </a>
        </div>
      </div>
    </footer>
  );
}
