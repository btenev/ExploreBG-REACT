import { TPhoto } from "@types";

export type PhotosState = {
  photos: TPhoto[];
  isUploading: boolean;
  changeMainClick: boolean;
  isDeletePhotosClick: boolean;
  photosForDelete: number[];
  showConfirmationModal: boolean;
};

export type PhotosAction =
  | { type: "APPEND_PHOTOS"; payload: TPhoto[] }
  | { type: "SET_MAIN_PHOTO"; payload: number }
  | { type: "SET_IS_UPLOADING"; payload: boolean }
  | { type: "SET_CHANGE_MAIN_CLICK"; payload: boolean }
  | { type: "SET_IS_DELETE_PHOTOS_CLICK"; payload: boolean }
  | { type: "SET_PHOTOS_FOR_DELETE"; payload: number[] }
  | { type: "SET_SHOW_CONFIRMATION_MODAL"; payload: boolean }
  | { type: "DELETE_PHOTOS"; payload: number[] };

export const initialPhotosState: PhotosState = {
  photos: [],
  isUploading: false,
  changeMainClick: false,
  isDeletePhotosClick: false,
  photosForDelete: [],
  showConfirmationModal: false,
};
