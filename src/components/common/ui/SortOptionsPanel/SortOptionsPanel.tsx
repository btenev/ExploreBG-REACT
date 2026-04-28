import React, { useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE } from "@constants";
import { DateSortConfig } from "@types";
import { useHasSession } from "@utils/sessionUtils";

interface SortOptionsPanelProps {
  alphabeticallySearchParam: string;
  dateSort?: DateSortConfig;
}

const SortOptionsPanel: React.FC<SortOptionsPanelProps> = ({
  alphabeticallySearchParam,
  dateSort,
}) => {
  const isLoggedIn = useHasSession();
  const {
    sortBy: dateSortBy = "creationDate",
    newestLabel = "Newest",
    oldestLabel = "Oldest",
  } = dateSort ?? {};

  const [activeSort, setActiveSort] = useState<string>(`${dateSortBy}-DESC`);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pageNumber = searchParams.get("pageNumber");
  const pageSize = searchParams.get("pageSize");

  const updateSortParams = (
    sortBy: string,
    sortDir: string,
    sortByLikedUser?: string,
  ) => {
    setActiveSort(`${sortBy}-${sortDir}${sortByLikedUser ? "-true" : ""}`);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("pageNumber", pageNumber ?? DEFAULT_PAGE_NUMBER);
    newParams.set("pageSize", pageSize ?? DEFAULT_CARDS_PER_PAGE);
    newParams.set("sortBy", sortBy);
    newParams.set("sortDir", sortDir);

    if (sortByLikedUser) {
      newParams.set("sortByLikedUser", sortByLikedUser);
    } else {
      newParams.delete("sortByLikedUser");
    }

    navigate(`${pathname}?${newParams.toString()}`);
  };

  return (
    <nav
      className="catalog-wrapper__nav"
      aria-label="all-trails-page-navigation"
    >
      <p>Sort by</p>

      <button
        onClick={() => updateSortParams(dateSortBy, "DESC")}
        className={activeSort === `${dateSortBy}-DESC` ? "active" : ""}
      >
        {newestLabel}
      </button>
      <button
        onClick={() => updateSortParams(dateSortBy, "ASC")}
        className={activeSort === `${dateSortBy}-ASC` ? "active" : ""}
      >
        {oldestLabel}
      </button>
      <button
        onClick={() => updateSortParams(alphabeticallySearchParam, "ASC")}
        className={
          activeSort === `${alphabeticallySearchParam}-ASC` ? "active" : ""
        }
      >
        A–Z
      </button>
      <button
        onClick={() => updateSortParams(alphabeticallySearchParam, "DESC")}
        className={
          activeSort === `${alphabeticallySearchParam}-DESC` ? "active" : ""
        }
      >
        Z–A
      </button>

      {isLoggedIn && (
        <>
          <button
            onClick={() => updateSortParams("id", "DESC", "true")}
            className={activeSort === "id-DESC-true" ? "active" : ""}
          >
            Liked
          </button>
          <button
            onClick={() => updateSortParams("id", "ASC", "true")}
            className={activeSort === "id-ASC-true" ? "active" : ""}
          >
            Not Liked
          </button>
        </>
      )}
    </nav>
  );
};

export default SortOptionsPanel;
