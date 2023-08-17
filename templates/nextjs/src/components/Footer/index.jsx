import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import styles from "./styles.module.css";
import React from "react";

/**
 * Renders a footer with the website logo, a set columns with navigation
 * links and some credits/copyright information.
 */
export const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.footerContainer}>
      <div className={styles.info}>
        <Link href="/">
          <Image
            src="/web-templates.svg"
            alt="Web Templates Logo"
            width={195}
            height={30}
          />
        </Link>
        <span>
          © 2023 <b>Your Company</b>
        </span>
      </div>
      <nav>
        <ul className={styles.columnList}>
          <li className={styles.linkColumn}>
            <h4>Starlight</h4>
            <ul>
              <li>
                <a href="https://www.starlight.sh/" target="_blank">Website</a>
              </li>
              <li>
                <a href="https://www.starlight.sh/#intro" target="_blank">Features</a>
              </li>
              <li>
                <a href="https://knowledge.starlight.sh/" target="_blank">Knowledge Center</a>
              </li>
            </ul>
          </li>
          <li className={styles.linkColumn}>
            <h4>Documentation</h4>
            <ul>
              <li>
                <a href="https://knowledge.starlight.sh/guia/desenvolvimento/" target="_blank">Development Guide</a>
              </li>
              <li>
                <a href="https://react.sdk.starlight.sh/" target="_blank">SDK Docs</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Container>
    <div className={styles.credits}>
      <span>
        Developed by <b>Your Company</b>
      </span>
      <div className={styles.creditsDivider} />
      <span>
        Powered by{" "}
        <a href="https://starlight.sh" target="_blank">
          <Image
            src="/starlight.svg"
            alt="Starlight Logo"
            width={84}
            height={18}
          />
        </a>
      </span>
    </div>
  </footer>
);
