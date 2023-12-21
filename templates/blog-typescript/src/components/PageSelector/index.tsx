import { useEffect, useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import styles from "./styles.module.scss";
import clsx from "clsx";

type PageSelectorProps = {
  category: string;
  currentPage: number;
  lastPage: number;
};

/**
 * Renders a simple page selector to help users navigate between pages of
 * articles. It is included only in the ArticlesPage component. It receives a
 * category name, the current page and the last page as props.
 *
 * @see ArticlesPage
 */
export default function PageSelector({
  category,
  currentPage,
  lastPage,
}: PageSelectorProps) {
  const [showLeftDots, setShowLeftDots] = useState(false);
  const [showRightDots, setShowRightDots] = useState(false);

  // TODO! FOCUS RING

  useEffect(() => {
    if (currentPage && lastPage && lastPage > 5) {
      setShowLeftDots(currentPage > 4);
      setShowRightDots(currentPage < lastPage - 3);
    }
  }, [currentPage, lastPage]);

  const pageList = useMemo(() => {
    if (currentPage && lastPage) {
      if (currentPage === 1 && lastPage > 5) return [1, 2, 3];

      if (currentPage === lastPage && lastPage > 5)
        return [lastPage - 2, lastPage - 1, lastPage];

      const pageStart = showLeftDots ? currentPage - 1 : 1;
      const pageEnd = showRightDots ? currentPage + 1 : lastPage;

      const list = [];

      for (let i = pageStart; i <= pageEnd; i++) list.push(i);

      return list;
    }
  }, [showLeftDots, showRightDots, currentPage, lastPage]);

  const getPageLink = (page: number) => {
    if (page === 1) {
      if (category !== "page") return `/${category}`;
      return `/`;
    }

    return `/${category}/${page}`;
  };

  return (
    <Pagination
      className={clsx(
        "d-flex justify-content-between fw-semibold mb-0 gap-5 gap-md-2 justify-content-md-start",
        styles.pagination,
      )}
    >
      <Pagination.Prev
        disabled={currentPage === 1}
        href={`/${category}/${currentPage - 1}`}
      >
        🡠 Anterior
      </Pagination.Prev>

      <span className="align-self-center fw-semibold text-brand-primary-400 d-md-none">
        Página {currentPage} de {lastPage}
      </span>

      <div className="d-none d-md-flex gap-2">
        {showLeftDots && (
          <>
            <Pagination.Item href={getPageLink(1)}>1</Pagination.Item>
            <Pagination.Ellipsis disabled />
          </>
        )}

        {pageList?.map((pageNumber: number) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            href={getPageLink(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        {showRightDots && (
          <>
            <Pagination.Ellipsis disabled />
            <Pagination.Item href={getPageLink(lastPage)}>
              {lastPage}
            </Pagination.Item>
          </>
        )}
      </div>

      <Pagination.Next
        disabled={currentPage === lastPage}
        href={`/${category}/${currentPage + 1}`}
      >
        Próxima 🡢
      </Pagination.Next>
    </Pagination>
  );
}
