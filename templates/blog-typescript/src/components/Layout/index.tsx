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
 * Renders the main website layout with the Header and Footer components.
 * Inside it, you should have the "Hero" content (the one with a pink
 * background) and a <Main> tag that has the page content inside it.
 *
 * You'll probably want to wrap all your pages with this component.
 * See any page index file to learn how to use it.
 *
 * @see Header
 * @see Footer
 * @see Main
 */
export const Layout = ({
  children,
  headerSingleton,
  footerSingleton,
}: LayoutProps) => (
  <div className={styles.layout}>
    <Header singleton={headerSingleton} />
    {children}
    <Footer singleton={footerSingleton} />
  </div>
);
