import { FooterSingleton, HeaderSingleton } from "@/starlight";
import { SearchContext } from "@/components/SearchContext";
import { ReactNode, useEffect, useState } from "react";
import { Singleton } from "@starlightcms/next-sdk";
import { Search } from "@/components/Search";
import styles from "./styles.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <SearchContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
        <Header singleton={headerSingleton} />
        {children}
        <Footer singleton={footerSingleton} />
        <Search />
      </SearchContext.Provider>
    </div>
  );
};
