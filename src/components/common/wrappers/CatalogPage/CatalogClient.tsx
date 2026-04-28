import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

import {
  CardSkeletons,
  LoadingScreenWrapper,
  NotFoundModal,
  PaginationControls,
  SortOptionsPanel,
} from "@components/common";
import {
  DEFAULT_CARDS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_SORT_BY,
  SORT_DIR_DESC,
} from "@constants";
import { DateSortConfig } from "@types";

interface PagedData<T> {
  content: T[];
  totalElements: number;
}

interface Props<T> {
  alphabeticallySearchParam: string;
  emptyMessage: string;
  dateSort?: DateSortConfig;
  useFetcher: (query: string) => {
    data: PagedData<T> | undefined;
    isLoading: boolean;
    error: unknown;
  };
  renderCard: (item: T) => ReactNode;
}

const CatalogClient = <T extends { id: number }>({
  alphabeticallySearchParam,
  emptyMessage,
  dateSort,
  useFetcher,
  renderCard,
}: Props<T>) => {
  const defaultSortBy = dateSort?.sortBy ?? DEFAULT_SORT_BY;
  const DEFAULT_QUERY = `?pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_CARDS_PER_PAGE}&sortBy=${defaultSortBy}&sortDir=${SORT_DIR_DESC}`;

  const [searchParams] = useSearchParams();
  const query = searchParams.toString()
    ? `?${searchParams.toString()}`
    : DEFAULT_QUERY;

  const { data, isLoading, error } = useFetcher(query);

  if (error) return <NotFoundModal message="Something went wrong!" />;
  if (isLoading) return <LoadingScreenWrapper />;
  if (!data || data.content.length === 0) {
    return <NotFoundModal message={emptyMessage} />;
  }

  return (
    <>
      <SortOptionsPanel
        alphabeticallySearchParam={alphabeticallySearchParam}
        dateSort={dateSort}
      />

      <section className="catalog-wrapper__cards">
        {isLoading && <LoadingScreenWrapper />}

        {isLoading ? (
          <article className="card">
            <CardSkeletons numOfCards={Number(DEFAULT_CARDS_PER_PAGE)} />
          </article>
        ) : (
          data.content.map((item) => (
            <article key={item.id} className="card">
              {renderCard(item)}
            </article>
          ))
        )}
      </section>

      <PaginationControls totalElements={data.totalElements} />
    </>
  );
};

export default CatalogClient;
