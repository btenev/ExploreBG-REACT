import { DeletableEntityType } from "../entity";

export type BasicDeleteParams = {
  entity: DeletableEntityType;
  entityId: string;
};

export type ExtendedDeleteParams = BasicDeleteParams & {
  secondaryId: string;
};
