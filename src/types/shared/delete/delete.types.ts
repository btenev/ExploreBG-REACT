import { EntityType } from '../entity';

export type BasicDeleteParams = {
  entity: EntityType;
  entityId: string;
};

export type ExtendedDeleteParams = BasicDeleteParams & {
  secondaryId: string;
};
