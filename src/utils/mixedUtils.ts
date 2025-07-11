import { IUser } from '../types/shared/user';

type CreatedByEntity = {
  createdBy?: {
    id?: number;
  };
};

export const isOwner = <T extends CreatedByEntity>(
  entity: T | null | undefined,
  userId: number
): boolean => entity?.createdBy?.id === userId;

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const toKebabCase = (str: string) =>
  str.replace(/([A-Z])/g, (letter) => '-' + letter.toLowerCase());

export const roundToTwoDecimals = (value: number): number => Math.round(value * 100) / 100;

export const convertMetersToKmM = (meters: number) => {
  const km = Math.floor(meters / 1000);
  const remainingMeters = Math.floor(meters % 1000);

  return `${km} km ${remainingMeters} m`;
};

export const hasRole = (roles: IUser['roles'], roleToCheck: string): boolean =>
  roles.some((obj) => obj.role === roleToCheck);
