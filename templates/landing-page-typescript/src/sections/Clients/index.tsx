import { Carousel, Container } from "react-bootstrap";
import { useMobile } from "@/components/MobileProvider";
import Image from "next/image";
import amazon from "./assets/amazon.svg";
import apple from "./assets/apple.svg";
import cisco from "./assets/cisco.svg";
import google from "./assets/google.svg";
import netflix from "./assets/netflix.svg";
import nintendo from "./assets/nintendo.svg";
import nubank from "./assets/nubank.svg";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

/**
 * Renders client logos. If the logos don't fit the browser window, it renders
 * a customized Bootstrap Carousel that cycles around to show all of them. This
 * component renders its content inside a Container, so you shouldn't place it
 * inside another one.
 *
 * @see https://react-bootstrap.github.io/docs/components/carousel
 * @see Clients
 */
export default function Clients() {
  const { screenWidth } = useMobile();
  const [clientsRowSize, setClientsRowSize] = useState(7);
  const [clientRows, setClientRows] = useState<string[][]>([]);

  /**
   * This effect defines the amount of logos that should fit the screen
   * depending on its width. That amount is represented by the clientsRowSize
   * state.
   */
  useEffect(() => {
    if (screenWidth < 576) {
      setClientsRowSize(2);
    } else if (screenWidth < 768) {
      setClientsRowSize(3);
    } else if (screenWidth < 992) {
      setClientsRowSize(4);
    } else if (screenWidth < 1200) {
      setClientsRowSize(5);
    } else {
      setClientsRowSize(7);
    }
  }, [screenWidth]);

  /**
   * This effect fills the clientRows state. Each row contains an amount of
   * logos equal to the clientsRowSize state value, and the idea is that the
   * rows should "loop around" the logo list - i.e. the first element of the
   * first row should be the first logo and the last element of the last row
   * should be the last logo.
   *
   * For example, if you assume clientsRowSize equals 4 and there are 6 logos
   * in total (named 1 through 6), there should be 3 rows:
   * Row 1: [1, 2, 3, 4]
   * Row 2: [5, 6, 1, 2]
   * Row 3: [3, 4, 5, 6]
   * Note that the row that follows row 3 is row 1.
   */
  useEffect(() => {
    const clients = [google, netflix, nubank, nintendo, apple, cisco, amazon];
    const size = clientsRowSize;
    let arrays: any[] = [];
    let index = 0;

    if (clients.length === size) {
      arrays.push(clients);
    } else {
      do {
        let newArray = [];

        if (index + size >= clients.length) {
          newArray = clients
            .slice(index, clients.length)
            .concat(clients.slice(0, index + size - clients.length));
          index = index + size - clients.length;
        } else {
          newArray = clients.slice(index, index + size);
          index = index + size;
        }

        arrays.push(newArray);
      } while (!(index === 0));
    }

    setClientRows(arrays);
  }, [clientsRowSize]);

  return (
    <Container className="text-center text-brand-800 mt-6 position-relative px-4">
      <h5 className="fw-bold">Trusted by global companies</h5>
      {clientRows.length > 1 && (
        <Carousel
          interval={0}
          indicators={false}
          controls={false}
          touch={false}
          className={clsx("pe-none w-100", styles.carousel)}
        >
          {clientRows.map((clientRow, index) => (
            <Carousel.Item key={index} className="h-100">
              <div className="d-flex justify-content-around align-items-center h-100">
                {clientRow.length &&
                  clientRow.map((client, index) => (
                    <Image key={index} src={client} alt={client} priority />
                  ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {clientRows.length === 1 && (
        <div className="d-flex justify-content-around align-items-center h-100">
          {clientRows[0].length &&
            clientRows[0].map((client, index) => (
              <Image key={index} src={client} alt={client} priority />
            ))}
        </div>
      )}
      <div className={styles.gradient} />
    </Container>
  );
}
