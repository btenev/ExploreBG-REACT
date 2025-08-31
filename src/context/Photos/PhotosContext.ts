import { createContext } from "react";

import { PhotosAction, PhotosState } from "./photosContext.types";

export const PhotosStateContext = createContext<PhotosState | undefined>(
  undefined
);

export const PhotosDispatchContext = createContext<
  React.Dispatch<PhotosAction> | undefined
>(undefined);
