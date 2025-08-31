import { useContext } from "react";

import { PhotosDispatchContext } from "./PhotosContext";

export const usePhotosDispatch = () => {
  const context = useContext(PhotosDispatchContext);
  if (context === undefined) {
    throw new Error(
      "usePhotosDispatch must be used within a PhotosContextProvider"
    );
  }
  return context;
};
