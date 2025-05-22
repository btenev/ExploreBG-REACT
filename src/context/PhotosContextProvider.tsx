import { createContext, ReactNode, useContext, useReducer } from 'react';

import { TPhoto } from '../types';

type PhotosState = {
  photos: TPhoto[];
  isUploading: boolean;
  changeMainClick: boolean;
  isDeletePhotosClick: boolean;
  photosForDelete: number[];
  showConfirmationModal: boolean;
};

export type PhotosAction =
  | { type: 'APPEND_PHOTOS'; payload: TPhoto[] }
  | { type: 'SET_MAIN_PHOTO'; payload: number }
  | { type: 'SET_IS_UPLOADING'; payload: boolean }
  | { type: 'SET_CHANGE_MAIN_CLICK'; payload: boolean }
  | { type: 'SET_IS_DELETE_PHOTOS_CLICK'; payload: boolean }
  | { type: 'SET_PHOTOS_FOR_DELETE'; payload: number[] }
  | { type: 'SET_SHOW_CONFIRMATION_MODAL'; payload: boolean }
  | { type: 'DELETE_PHOTOS'; payload: number[] };

const initialPhotosState: PhotosState = {
  photos: [],
  isUploading: false,
  changeMainClick: false,
  isDeletePhotosClick: false,
  photosForDelete: [],
  showConfirmationModal: false,
};

function photosReducer(state: PhotosState, action: PhotosAction): PhotosState {
  switch (action.type) {
    case 'APPEND_PHOTOS':
      return { ...state, photos: [...state.photos, ...action.payload] };
    case 'SET_MAIN_PHOTO':
      return {
        ...state,
        photos: state.photos.map((photo) => ({
          ...photo,
          isMain: photo.id === action.payload,
        })),
      };
    case 'SET_IS_UPLOADING':
      return { ...state, isUploading: action.payload };
    case 'SET_CHANGE_MAIN_CLICK':
      return { ...state, changeMainClick: action.payload };
    case 'SET_IS_DELETE_PHOTOS_CLICK':
      return { ...state, isDeletePhotosClick: action.payload };
    case 'SET_PHOTOS_FOR_DELETE':
      return { ...state, photosForDelete: action.payload };
    case 'SET_SHOW_CONFIRMATION_MODAL':
      return { ...state, showConfirmationModal: action.payload };
    case 'DELETE_PHOTOS': {
      const deleteSet = new Set(action.payload);
      const isMainDeleted = state.photos.some((p) => p.isMain && deleteSet.has(p.id));

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

const PhotosStateContext = createContext<PhotosState | undefined>(undefined);
const PhotosDispatchContext = createContext<React.Dispatch<PhotosAction> | undefined>(undefined);

export const PhotosContextProvider = ({
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
      <PhotosDispatchContext.Provider value={dispatch}>{children}</PhotosDispatchContext.Provider>
    </PhotosStateContext.Provider>
  );
};

export const usePhotosState = () => {
  const context = useContext(PhotosStateContext);
  if (context === undefined) {
    throw new Error('usePhotosState must be used within a PhotosContextProvider');
  }
  return context;
};

export const usePhotosDispatch = () => {
  const context = useContext(PhotosDispatchContext);
  if (context === undefined) {
    throw new Error('usePhotosDispatch must be used within a PhotosContextProvider');
  }
  return context;
};
