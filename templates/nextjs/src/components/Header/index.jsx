import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";

/**
 * Renders a top-fixed header with a logo, a link list and a button list.
 * On mobile, a "burger" icon is rendered, which allows the user to open
 * and close a mobile sidebar with the link and button lists.
 */
export const Header = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * This effect is used to close the mobile menu when the user
   * clicks on a link or a button that updates the current URL.
   */
  useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false);

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("hashChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("hashChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <Link href="/">
          <Image
            src="/web-templates.svg"
            alt="Web Templates Logo"
            className={styles.logo}
            width={195}
            height={30}
            priority
          />
        </Link>
        <nav className={clsx(styles.menu, isMobileMenuOpen && styles.menuOpen)}>
          <ul className={styles.linkList}>
            <li>
              <Link href="/models">Models</Link>
            </li>
            <li>
              <Link href="/a-page">A page</Link>
            </li>
            <li>
              <Link href="/another-page">Another page</Link>
            </li>
          </ul>
          <ul className={styles.actionList}>
            <li>
              <Link href="#">
                <button>Sign In</button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <button className={styles.cta}>Call to Action</button>
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={styles.burger}
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
        />
      </Container>
    </header>
  );
};
