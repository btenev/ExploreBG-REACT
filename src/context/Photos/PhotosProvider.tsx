import { ReactNode, useReducer } from "react";

import { TPhoto } from "@types";

import { PhotosDispatchContext, PhotosStateContext } from "./PhotosContext";
import {
  PhotosState,
  PhotosAction,
  initialPhotosState,
} from "./photosContext.types";

function photosReducer(state: PhotosState, action: PhotosAction): PhotosState {
  switch (action.type) {
    case "APPEND_PHOTOS":
      return { ...state, photos: [...state.photos, ...action.payload] };
    case "SET_MAIN_PHOTO":
      return {
        ...state,
        photos: state.photos.map((photo) => ({
          ...photo,
          isMain: photo.id === action.payload,
        })),
      };
    case "SET_IS_UPLOADING":
      return { ...state, isUploading: action.payload };
    case "SET_CHANGE_MAIN_CLICK":
      return { ...state, changeMainClick: action.payload };
    case "SET_IS_DELETE_PHOTOS_CLICK":
      return { ...state, isDeletePhotosClick: action.payload };
    case "SET_PHOTOS_FOR_DELETE":
      return { ...state, photosForDelete: action.payload };
    case "SET_SHOW_CONFIRMATION_MODAL":
      return { ...state, showConfirmationModal: action.payload };
    case "DELETE_PHOTOS": {
      const deleteSet = new Set(action.payload);
      const isMainDeleted = state.photos.some(
        (p) => p.isMain && deleteSet.has(p.id)
      );

      const filteredPhotos = state.photos.filter((p) => !deleteSet.has(p.id));
      const updatedPhotos = filteredPhotos.map((p, index) => {
        if (isMainDeleted && index === 0) {
          return { ...p, isMain: true };
        } else if (!isMainDeleted) {
          return p;
        }
        return { ...p, isMain: false };
      });

      return { ...state, photos: updatedPhotos };
    }
    default:
      return state;
  }
}

export const PhotosProvider = ({
  children,
  initialPhotos,
}: {
  children: ReactNode;
  initialPhotos: TPhoto[];
}) => {
  const [state, dispatch] = useReducer(photosReducer, {
    ...initialPhotosState,
    photos: initialPhotos,
  });

  return (
    <PhotosStateContext.Provider value={state}>
      <PhotosDispatchContext.Provider value={dispatch}>
        {children}
      </PhotosDispatchContext.Provider>
    </PhotosStateContext.Provider>
  );
};
