import { JSX } from "react";
import { useParams } from "react-router-dom";

import { NotFoundModal, LoadingScreenWrapper } from "@components/common";
import { EntityType } from "@types";
import { isApiError } from "@utils/errorHandlers";
import { isOwner } from "@utils/mixedUtils";
import { useSessionInfo } from "@utils/sessionUtils";

type UseDetailsOptions<T> = {
  paramName: string; // e.g. "trailId" | "accommodationId"
  fetchHook: (id: string) => {
    data: T | undefined;
    error: unknown;
    isLoading: boolean;
  };
  entityType: EntityType;
  children: (
    data: NonNullable<T>,
    canEdit: boolean,
    userId: number | null,
    canShowFavourite: boolean
  ) => JSX.Element;
};

const EntityDetailsWrapper = <T,>({
  paramName,
  fetchHook,
  entityType,
  children,
}: UseDetailsOptions<T>) => {
  const params = useParams<{ [key: string]: string }>();

  const id = params[paramName];
  const numericId = Number(id);

  const { hasHydrated, userId } = useSessionInfo();

  if (!id || isNaN(numericId)) {
    return (
      <NotFoundModal
        message={`Oops! We couldn't find that ${entityType}. Please check the link and try again.`}
      />
    );
  }

  const { data, error, isLoading } = fetchHook(id);

  if (isLoading || !hasHydrated) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return (
      <NotFoundModal
        message={`The ${entityType} you're looking for was not found.`}
      />
    );
  }

  if (!data) {
    return (
      <NotFoundModal
        message={`The ${entityType} you're looking for was not found.`}
      />
    );
  }

  const canEdit = userId !== null && isOwner(data, userId);

  const canShowFavorite = userId !== null && !canEdit;

  return <>{children(data, canEdit, userId, canShowFavorite)}</>;
};

export default EntityDetailsWrapper;
