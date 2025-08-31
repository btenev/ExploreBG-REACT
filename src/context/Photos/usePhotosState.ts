import { useContext } from "react";

import { PhotosStateContext } from "./PhotosContext";

export const usePhotosState = () => {
  const context = useContext(PhotosStateContext);
  if (context === undefined) {
    throw new Error(
      "usePhotosState must be used within a PhotosContextProvider"
    );
  }
  return context;
};
