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

type InnerClientsProps = {
  screenWidth: number;
};

// TODO! Review description?
/**
 * Renders the client logos. On smaller windows that can't fit all the 7 logos
 * (including mobile) it uses a modified Carousel component that cycles around
 * to show all the logos. It is outside the main Container component because it
 * should fit the entire screen in smaller windows.
 *
 * Below this component is Clients, which wraps around InnerClients.
 */
function InnerClients({ screenWidth }: InnerClientsProps) {
  const [clientRows, setClientRows] = useState<string[][]>([]);
  const [clientsRowSize, setClientsRowSize] = useState(7);

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
    <>
      <h5 className="fw-bold">Trusted by global companies</h5>
      <Carousel
        interval={0}
        indicators={false}
        controls={false}
        touch={false}
        className={clsx("pe-none w-100", styles.carousel)}
      >
        {clientRows.length > 1 &&
          clientRows.map((clientRow, index) => (
            <Carousel.Item key={index} className="h-100">
              <div className="d-flex justify-content-around align-items-center h-100">
                {clientRow.length &&
                  clientRow.map((client, index) => (
                    <Image key={index} src={client} alt={client} priority />
                  ))}
              </div>
            </Carousel.Item>
          ))}
        {clientRows.length === 1 && (
          <div className="d-flex justify-content-around align-items-center h-100">
            {clientRows[0].length &&
              clientRows[0].map((client, index) => (
                <Image key={index} src={client} alt={client} priority />
              ))}
          </div>
        )}
      </Carousel>
    </>
  );
}

// TODO! Review description?
/**
 * Renders the InnerClients wrapper. On bigger screens it's simply a custom
 * Container component (with horizontal margins), but on smaller screens it
 * is a div that fits the whole width and has a white-to-transparent gradient
 * on both sides of the screen.
 */
export default function Clients() {
  const { screenWidth } = useMobile();

  return (
    <>
      {screenWidth >= 1200 ? (
        <Container className="text-center text-brand-800 mt-6 position-relative px-4">
          <InnerClients screenWidth={screenWidth} />
        </Container>
      ) : (
        <div className="text-center text-brand-800 mt-6 position-relative">
          <InnerClients screenWidth={screenWidth} />
          <div className={styles.gradient} />
        </div>
      )}
    </>
  );
}
