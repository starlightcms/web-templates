import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import styles from "./styles.module.css";

/**
 * Renders the main website layout and place its children inside a Container
 * component. The layout includes the Header and Footer assets.
 *
 * You'll probably want to wrap all your pages with this component.
 * See the website index file to learn how to use it.
 *
 * @see Header
 * @see Footer
 * @see Container
 */
export const Layout = ({ children }) => (
  <>
    <Header />
    <Container as="main" className={styles.mainContainer}>
      {children}
    </Container>
    <Footer />
  </>
);
