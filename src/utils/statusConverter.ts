import {
  detailsStatusEnumSchema,
  ReviewStatusEnumSchema,
} from "../schemas/common";
import { ReviewStatusEnum, StatusEnum } from "../types";
import { safeParseOrThrow } from "./zodHelpers";

export const detailsStatusConverter = (detailsStatus: unknown): StatusEnum => {
  return safeParseOrThrow(
    detailsStatusEnumSchema,
    detailsStatus,
    `Invalid details status value: ${detailsStatus}`
  );
};

export const reviewStatusConverter = (
  entityStatus: unknown
): ReviewStatusEnum => {
  return safeParseOrThrow(
    ReviewStatusEnumSchema,
    entityStatus,
    `Invalid entity status value: ${entityStatus}`
  );
};
