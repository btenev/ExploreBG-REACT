import { IUser } from "../types/shared";

type CreatedByEntity = {
  createdBy?: {
    id?: number;
  };
};

export const isOwner = <T extends CreatedByEntity>(
  entity: T | null | undefined,
  userId: number
): boolean => entity?.createdBy?.id === userId;

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toKebabOrSpace = (str: string, useKebab: boolean = true) => {
  const delimiter = useKebab ? "-" : " ";
  return str.replace(/([A-Z])/g, (match) => delimiter + match.toLowerCase());
};

export const roundToTwoDecimals = (value: number): number =>
  Math.round(value * 100) / 100;

export const convertMetersToKmM = (meters: number) => {
  const km = Math.floor(meters / 1000);
  const remainingMeters = Math.floor(meters % 1000);

  return `${km} km ${remainingMeters} m`;
};

export const hasRole = (roles: IUser["roles"], roleToCheck: string): boolean =>
  roles.some((obj) => obj.role === roleToCheck);

export const formatCoordinate = (
  lat: number | null,
  lon: number | null
): string => {
  if (lat == null || lon == null) {
    return "Not specified";
  }

  const latDirection = lat >= 0 ? "N" : "S";
  const lonDirection = lon >= 0 ? "E" : "W";

  const absLat = Math.abs(lat).toFixed(5);
  const absLon = Math.abs(lon).toFixed(5);

  return `${absLat}° ${latDirection}, ${absLon}° ${lonDirection}`;
};
