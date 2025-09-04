import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  DEFAULT_CARDS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY,
  SORT_DIR_DESC,
} from "@constants";

import "./PaginationControls.scss";

interface Props {
  totalElements: number;
  sortByProp?: string;
  sortDirProp?: string;
}

const PaginationControls = ({
  totalElements,
  sortByProp,
  sortDirProp,
}: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const cardsPerPage = searchParams.get("pageSize") ?? DEFAULT_CARDS_PER_PAGE;
  const page = Number(searchParams.get("pageNumber") ?? DEFAULT_PAGE_NUMBER);
  const totalPages = Math.ceil(totalElements / Number(cardsPerPage));

  const sortBy = searchParams.get("sortBy") ?? DEFAULT_SORT_BY;
  const sortDir = searchParams.get("sortDir") ?? SORT_DIR_DESC;

  let start = page === 1 ? 1 : page - 1;
  let end = totalPages;

  if (totalPages >= 5) {
    if (totalPages > start + 4) {
      end = start + 4;
    } else {
      start = Math.max(totalPages - 4, 1);
    }
  }

  const onChangePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("pageNumber", newPage.toString());
    newParams.set("pageSize", cardsPerPage.toString());
    newParams.set("sortBy", sortByProp ?? sortBy);
    newParams.set("sortDir", sortDirProp ?? sortDir);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  if (!totalElements) return null;

  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => onChangePage(i)}
        className={i === page ? "current-btn" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <>
      {totalElements && (
        <aside className="pagination-buttons">
          <button onClick={() => onChangePage(1)} disabled={page == 1}>
            &lt;&lt;&lt;
          </button>
          <button
            onClick={() => onChangePage(page - 1)}
            className="pagination-buttons__prev-next"
            disabled={page == 1}
          >
            Prev
          </button>

          {buttons}

          <button
            onClick={() => onChangePage(page + 1)}
            className="pagination-buttons__prev-next"
            disabled={page == totalPages}
          >
            Next
          </button>
          <button
            onClick={() => onChangePage(totalPages)}
            disabled={page == totalPages}
          >
            &gt;&gt;&gt;
          </button>
        </aside>
      )}
    </>
  );
};

export default PaginationControls;
