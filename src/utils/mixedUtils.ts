type CreatedByEntity = {
  createdBy?: {
    id?: number;
  };
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const isOwner = <T extends CreatedByEntity>(
  entity: T | null | undefined,
  userId: number
): boolean => entity?.createdBy?.id === userId;
