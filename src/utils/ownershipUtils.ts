export const getOwnershipFlags = (
  sessionUserId: number | null,
  createdById?: number | null
) => {
  const isCreator =
    sessionUserId !== null &&
    createdById != null &&
    sessionUserId === createdById;

  const canLike = sessionUserId !== null && createdById != null && !isCreator;
  return { isCreator, canLike };
};
