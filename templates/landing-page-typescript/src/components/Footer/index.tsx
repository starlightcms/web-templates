import { Singleton, Image } from "@starlightcms/next-sdk";
import { FooterSingleton } from "@/starlight";
import { Container } from "react-bootstrap";
import Link from "next/link";

type FooterProps = {
  singleton: Singleton<FooterSingleton>;
};

/**
 * Renders a footer with the website logo, a set columns with navigation
 * links and some credits/copyright information.
 */
export default function Footer({ singleton }: FooterProps) {
  const firstListItems = [
    { href: "https://www.starlight.sh/", label: singleton.data.website },
    { href: "https://www.starlight.sh/#intro", label: singleton.data.features },
    {
      href: "https://knowledge.starlight.sh/",
      label: singleton.data.knowledge_center,
    },
  ];

  const secondListItems = [
    {
      href: "https://knowledge.starlight.sh/guia/desenvolvimento/",
      label: singleton.data.development_guide,
    },
    { href: "https://react.sdk.starlight.sh/", label: singleton.data.sdk_docs },
  ];

  const lists = [
    { name: "Starlight", items: firstListItems },
    { name: singleton.data.documentation, items: secondListItems },
  ];

  return (
    <footer className="bg-brand-50 border-top border-brand-100 text-brand-800">
      <Container className="d-flex flex-column gap-4 flex-md-row justify-content-md-between p-5 px-5">
        <div className="d-flex flex-column gap-4 justify-content-md-between">
          <Link href="/">
            <Image
              media={singleton.data.website_logo}
              alt="Web Templates Logo"
              width={195}
              height={30}
            />
          </Link>
          <span>
            © {singleton.data.year} <b>{singleton.data.company_name}</b>
          </span>
        </div>
        <nav>
          <ul className="list-unstyled gap-5 mb-0 d-flex flex-column flex-md-row gap-lg-8">
            {lists.map((listItem) => (
              <li key={listItem.name}>
                <h4 className="fw-bold">{listItem.name}</h4>
                <ul className="list-unstyled d-flex flex-column gap-2 mt-4">
                  {listItem.items.map((item) => (
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
            ))}
          </ul>
        </nav>
      </Container>
      <div className="d-flex flex-column justify-content-center align-items-center flex-md-row w-100 py-6 gap-3">
        <span className="d-flex align-items-center gap-1">
          {singleton.data.developed_by} <b>{singleton.data.company_name}</b>
        </span>
        <div className="vr mx-3 bg-brand-200" />
        <span>
          Powered by{" "}
          <a href="https://starlight.sh" target="_blank">
            <Image
              media={singleton.data.starlight_logo}
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
