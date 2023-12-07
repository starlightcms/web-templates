import { FooterSingleton, HeaderSingleton } from "@/starlight";
import { Singleton } from "@starlightcms/next-sdk";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode, useEffect, useState } from "react";
import { Search } from "@/components/Search";
import { Are_You_Serious } from "next/dist/compiled/@next/font/dist/google";

type LayoutProps = {
  children: ReactNode;
  headerSingleton: Singleton<HeaderSingleton>;
  footerSingleton: Singleton<FooterSingleton>;
};

/**
 * Renders the main website layout with the Header, Footer and Search
 * components. Inside it, you should have the "Hero" content (the one with a
 * pink background) and a <Main> tag that has the page content inside it.
 *
 * You'll probably want to wrap all your pages with this component.
 * See any page index file to learn how to use it.
 *
 * @see Header
 * @see Footer
 * @see Search
 * @see Main
 */
export const Layout = ({
  children,
  headerSingleton,
  footerSingleton,
}: LayoutProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <Header singleton={headerSingleton} setIsSearchOpen={setIsSearchOpen} />
      {children}
      <Footer singleton={footerSingleton} />
      <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </div>
  );
};
