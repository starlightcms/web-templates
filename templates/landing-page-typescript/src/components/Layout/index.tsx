import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
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
export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <Header />
    <Container as="main" className="d-flex flex-column gap-7 py-6 py-lg-7">
      {children}
    </Container>
    <Footer />
  </div>
);
