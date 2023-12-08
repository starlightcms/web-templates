import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { EmptySearch } from "./components/EmptySearch";
import { KeyWrapper } from "./components/KeyWrapper";
import { SearchCard } from "./components/SearchCard";
import styles from "./styles.module.scss";
import clsx from "clsx";

type SearchProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// TODO! DESCRIPTION, TEXTS?
/**
 * Renders
 */
export const Search = ({ isOpen, setIsOpen }: SearchProps) => {
  // TODO! REVIEW SPANS AND PS ALL OVER PROJECT

  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [searchResults, setSearchResults] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const maxIndex = 8; // TODO! REQUEST SEARCH LIST...

  useEffect(() => {
    if (!isOpen) setSelectedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key.includes("Arrow")) event.preventDefault();

      if (hasSearched && searchResults.length > 0) {
        if (selectedIndex === 0) {
          setSelectedIndex(1);
        } else {
          if (event.key === "ArrowDown")
            setSelectedIndex((prevState) =>
              prevState !== maxIndex ? prevState + 1 : prevState,
            );

          if (event.key === "ArrowUp")
            setSelectedIndex((prevState) =>
              prevState !== 1 ? prevState - 1 : prevState,
            );

          console.log(cardRefs.current[selectedIndex - 1]);
          cardRefs.current[selectedIndex - 1]?.scrollIntoView({
            behavior: "smooth",
            block: event.key === "ArrowUp" ? "end" : "start",
          });

          if (event.key === "Enter") {
            console.log("hello");
            // TODO! GO TO SELECTED ARTICLE...
          }
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [selectedIndex, hasSearched]);

  if (!isOpen) return <></>;

  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100 position-fixed start-0 top-0 z-2">
      <div
        className={clsx(
          "w-100 h-100 position-absolute start-0 top-0",
          styles.overlay,
        )}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={clsx(
          "d-flex flex-column flex-grow-1 overflow-hidden z-2",
          styles.popup,
        )}
      >
        <div className="d-flex flex-column bg-brand-primary-50 w-100 h-100 p-3 gap-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="fs-5 text-brand-secondary-400 fw-bold lh-1">
              Search
            </span>
            <div
              className={clsx(
                "d-flex justify-content-center align-items-center bg-brand-secondary-200 text-brand-secondary-700 fs-6",
                styles.closeButton,
              )}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </div>
          </div>
          <div className="position-relative">
            <input
              className={clsx(
                "w-100 ps-6 py-3 rounded-2 focus-ring",
                styles.searchInput,
              )}
            />
            <span className={clsx("position-absolute", styles.searchIcon)}>
              🔍
            </span>
          </div>
          {hasSearched ? (
            <div
              className={clsx(
                "d-flex flex-column gap-3 overflow-y-scroll",
                styles.cardWrapper,
              )}
            >
              {searchResults.map((item, index) => (
                <SearchCard
                  key={item}
                  title="Travelling as a way of self-discovery and progress"
                  info="Nov 12th at 2:50 PM"
                  label="Tech"
                  active={selectedIndex === index + 1}
                  cardRef={(element: HTMLAnchorElement) =>
                    (cardRefs.current[index] = element)
                  }
                />
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <EmptySearch
              label="What are you looking for?"
              description="Fill in the search field above."
            />
          ) : (
            <EmptySearch
              label="Uh-oh, we found nothing..."
              description="Try using other keywords."
            />
          )}
        </div>
        <div className="d-none d-md-flex bg-brand-primary-100 w-100 p-3 gap-4 text-brand-primary-800 fw-semibold fs-6">
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="⤶" />
            <span>to select</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="🡡" />
            <KeyWrapper keyText="🡣" />
            <span>to navigate</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="Esc" />
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
