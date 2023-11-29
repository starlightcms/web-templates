import { FooterSingleton, HeaderSingleton } from "@/starlight";
import { Singleton } from "@starlightcms/next-sdk";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  headerSingleton: Singleton<HeaderSingleton>;
  footerSingleton: Singleton<FooterSingleton>;
};

/**
 * Renders the main website layout and place its children inside a Container
 * component. The layout includes the Header and Footer assets.
 *
 * You'll probably want to wrap all your pages with this component.
 * See the website index file to learn how to use it.
 *
 * @see Header
 * @see Footer
 */
export const Layout = ({
  children,
  headerSingleton,
  footerSingleton,
}: LayoutProps) => (
  <div className={styles.layout}>
    <Header singleton={headerSingleton} />
    <Container as="main" className="d-flex flex-column gap-7 py-5 py-lg-6">
      {children}
    </Container>
    <Footer singleton={footerSingleton} />
  </div>
);
