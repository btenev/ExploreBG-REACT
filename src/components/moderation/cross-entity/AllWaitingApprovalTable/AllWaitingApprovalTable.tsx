import { useMemo, useState } from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";

import { WaitingApprovalCountResponse } from "@api/moderation/moderationDashboardApi";
import {
  LoadingSpinner,
  PaginationControls,
  ViewDetails,
} from "@components/common";
import { DEFAULT_CARDS_PER_PAGE, DEFAULT_PAGE_NUMBER } from "@constants";
import { useGetWaitingApprovalEntities } from "@hooks/dataHooks/moderation/crossEntityReviewHooks";
import { CollectionType, StatusEnum, TImagesForReview } from "@types";
import { formatFullDate } from "@utils/dateUtils";

interface Props {
  waitingApprovalCount: WaitingApprovalCountResponse;
  staffId: number;
}

// Type guard function
function isCollectionType(value: string): value is CollectionType {
  //TODO: Move somewhere else?
  return ["trails", "accommodations", "destinations"].includes(value);
}

const AllWaitingApprovalTable = ({ waitingApprovalCount, staffId }: Props) => {
  const [activeCollection, setActiveCollection] =
    useState<CollectionType | null>(null);
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("pageNumber")) || DEFAULT_PAGE_NUMBER;
  const resultsPerPage =
    Number(searchParams.get("pageSize")) || DEFAULT_CARDS_PER_PAGE;
  const query = `?pageNumber=${page}&pageSize=${resultsPerPage}`;

  const { data, isFetching } = useGetWaitingApprovalEntities({
    enabled: activeCollection !== null,
    collection: activeCollection,
    query: query,
    keyDeps: [page, resultsPerPage, query],
  });

  const items = data?.content || [];
  const totalElements = data?.totalElements || 0;

  const countFrom = useMemo(
    () => totalElements - (page - 1) * resultsPerPage,
    [totalElements, page, resultsPerPage]
  );

  const imageDetails = (images: TImagesForReview) => {
    return (
      <ul>
        {images.map((i) => (
          <li key={i.id}>
            {`id: ${i.id} -- ${
              i.image_status === StatusEnum.pending
                ? i.image_status
                : `reviewed by: ${i.reviewedBy?.username}`
            }
         `}
          </li>
        ))}
      </ul>
    );
  };

  const validCollections = Object.entries(waitingApprovalCount)
    .filter(([collection]) => isCollectionType(collection))
    .map(
      ([collection, count]) =>
        [collection, count as number] as [CollectionType, number]
    );

  return (
    <>
      <ul className="admin-wrapper__pending-menu">
        {validCollections.map(([collection, count]) => (
          <li
            key={collection}
            onClick={() => setActiveCollection(collection)}
            className={activeCollection === collection ? "active" : ""}
            style={{ display: count === 0 ? "none" : "inline-block" }}
          >
            {`${collection} - ${count}`}
          </li>
        ))}
      </ul>
      {activeCollection === null && (
        <div>Select a collection to view details</div>
      )}
      {activeCollection !== null && isFetching && <LoadingSpinner />}
      {activeCollection !== null && !isFetching && (
        <table>
          <thead>
            <tr>
              <th>
                <AiOutlineFieldNumber />
              </th>
              <th>Name</th>
              <th>Details status</th>
              <th>Link</th>
              <th>Images status</th>
              {activeCollection === "trails" && <th>Gpx status</th>}
              <th>Creation date</th>
              <th>Review by</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p, index: number) => (
              <tr key={p.id}>
                <td>{countFrom - index}</td>
                <td>{p.name}</td>
                <td>{`${p.detailsStatus}`}</td>
                <td>
                  {(staffId == p.reviewedBy?.id ||
                    p.detailsStatus !== StatusEnum.review) && (
                    <Link to={`/moderation/${activeCollection}/${p.id}/review`}>
                      View
                    </Link>
                  )}
                </td>
                <td>
                  {p.images.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span>
                        {`${
                          p.images.filter(
                            (i) => i.image_status === StatusEnum.pending
                          ).length
                        } - pending`}
                      </span>
                      <span>
                        {`${
                          p.images.filter(
                            (i) => i.image_status === StatusEnum.review
                          ).length
                        } - review`}
                      </span>
                      <span>
                        {`${
                          p.images.filter(
                            (i) => i.image_status === StatusEnum.approved
                          ).length
                        } - approved`}
                      </span>
                      <ViewDetails element={imageDetails(p.images)} />
                    </div>
                  )}
                </td>
                {activeCollection === "trails" && (
                  <td>
                    <div>
                      <span>{p.gpxFile?.gpxStatus}</span>
                      {p.gpxFile?.gpxStatus &&
                        p.gpxFile?.gpxStatus !== StatusEnum.pending && (
                          <ViewDetails
                            details={`reviewed by: ${p.gpxFile?.reviewedBy?.username}`}
                          />
                        )}
                    </div>
                  </td>
                )}

                <td>{formatFullDate(p.creationDate)}</td>
                <td>{p.reviewedBy?.username}</td>
              </tr>
            ))}
          </tbody>
        </table> /*TODO: remove "0" and style div with text*/
      )}
      "0"
      <PaginationControls totalElements={totalElements} />
    </>
  );
};

export default AllWaitingApprovalTable;
