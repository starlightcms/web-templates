import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSearchContext } from "@/components/SearchContext";
import Starlight, { Entry } from "@starlightcms/next-sdk";
import { EmptySearch } from "./components/EmptySearch";
import { KeyWrapper } from "./components/KeyWrapper";
import { SearchCard } from "./components/SearchCard";
import styles from "./styles.module.scss";
import search from "./assets/search.svg";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";
import { Article } from "@/starlight";
import Image from "next/image";
import clsx from "clsx";

/**
 * Renders a search popup that lets the user search for a specific entry. It
 * only receives an isOpen state and its setter as props. This component is
 * only used in the Header and has a few other subcomponents inside it.
 */
export const Search = () => {
  const router = useRouter();
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const { isSearchOpen, setIsSearchOpen } = useSearchContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Entry<Article>[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const maxEntries = 8;

  useEffect(() => {
    if (!isSearchOpen) setSelectedIndex(0);
  }, [isSearchOpen]);

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const searchForEntries = async (query: string) => {
    if (query.length) {
      const response = await Starlight.search.entries<Article>({
        query,
        models: "articles",
        limit: maxEntries,
      });

      setSearchResults(response.data);
      setHasSearched(true);
    }
  };

  const debouncedHandleSearch = useCallback(
    debounce(searchForEntries, 1500),
    [],
  );

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key.includes("Arrow")) event.preventDefault();

      if (hasSearched && searchResults.length > 0) {
        if (selectedIndex === 0) {
          setSelectedIndex(1);
        } else {
          if (event.key === "ArrowDown")
            setSelectedIndex((prevState) =>
              prevState !== maxEntries ? prevState + 1 : prevState,
            );

          if (event.key === "ArrowUp")
            setSelectedIndex((prevState) =>
              prevState !== 1 ? prevState - 1 : prevState,
            );

          cardRefs.current[selectedIndex - 1]?.scrollIntoView({
            behavior: "smooth",
            block: event.key === "ArrowUp" ? "end" : "start",
          });

          if (event.key === "Enter") {
            router.push(`/article/${searchResults[selectedIndex].slug}`);
          }
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [router, searchResults, selectedIndex, hasSearched]);

  if (!isSearchOpen) return <></>;

  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100 position-fixed start-0 top-0 z-2">
      <div
        className={clsx(
          "w-100 h-100 position-absolute start-0 top-0",
          styles.overlay,
        )}
        onClick={() => setIsSearchOpen(false)}
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
              Busca
            </span>
            <div
              className={clsx(
                "d-flex justify-content-center align-items-center bg-brand-secondary-200 text-brand-secondary-700 fs-6",
                styles.closeButton,
              )}
              onClick={handleClose}
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
              value={searchQuery}
              onChange={(e) => {
                debouncedHandleSearch(e.target.value);
                setSearchQuery(e.target.value);
              }}
            />
            <span className={clsx("position-absolute", styles.searchIcon)}>
              <Image src={search} alt="search" width={16} height={16} />
            </span>
          </div>
          {hasSearched && searchQuery !== "" ? (
            searchResults.length > 0 ? (
              <div
                className={clsx(
                  "d-flex flex-column gap-3 overflow-y-scroll",
                  styles.cardWrapper,
                )}
              >
                {searchResults.map((article, index) => (
                  <SearchCard
                    key={article.slug}
                    article={article}
                    active={selectedIndex === index + 1}
                    cardRef={(element: HTMLAnchorElement) =>
                      (cardRefs.current[index] = element)
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptySearch
                label="Opa, não encontramos nada..."
                description="Tente usar outras palavras-chave."
              />
            )
          ) : (
            <EmptySearch
              label="O quê você está procurando?"
              description="Preencha o campo de busca acima."
            />
          )}
        </div>
        <div className="d-none d-md-flex bg-brand-primary-100 w-100 p-3 gap-4 text-brand-primary-800 fw-semibold fs-6">
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="⤶" />
            <span>para selecionar</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="🡡" />
            <KeyWrapper keyText="🡣" />
            <span>para navegar</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <KeyWrapper keyText="Esc" />
            <span>para fechar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
