import { BiSolidSelectMultiple } from "react-icons/bi";
import { FcCancel, FcStackOfPhotos } from "react-icons/fc";
import { ImBin } from "react-icons/im";

import { ConfirmationModal } from "@components/common";
import { usePhotosDispatch, usePhotosState } from "@context/Photos";
import { useDeletePhotos } from "@hooks/dataHooks/imageHooks";

import UploadPhotos from "./UploadPhotos";

interface Props {
  entityId: number;
  folder: string;
}

const PhotoActionButtons = ({ entityId, folder }: Props) => {
  const {
    photos,
    photosForDelete,
    isDeletePhotosClick,
    changeMainClick,
    showConfirmationModal,
  } = usePhotosState();
  const dispatch = usePhotosDispatch();

  const { mutate: deletePhotos } = useDeletePhotos(dispatch);

  const handleDeleteAll = () => {
    const uniquePhotoIds = Array.from(new Set(photos.map((p) => p.id)));
    dispatch({ type: "SET_PHOTOS_FOR_DELETE", payload: uniquePhotoIds });

    dispatch({ type: "SET_SHOW_CONFIRMATION_MODAL", payload: true });
  };

  const handleDeletePhotos = () => {
    dispatch({ type: "SET_IS_UPLOADING", payload: true });
    dispatch({ type: "SET_SHOW_CONFIRMATION_MODAL", payload: false });

    const data = {
      entityId: entityId.toString(),
      photos: { folder: folder, ids: photosForDelete },
    };

    deletePhotos(data);
  };
  return (
    <>
      <div className="photos-wrapper__buttons">
        {photos.length > 0 && (
          <>
            {isDeletePhotosClick && (
              <>
                <button onClick={handleDeleteAll}>
                  <span>Delete all</span>
                  <BiSolidSelectMultiple
                    style={{ fontSize: "1.25rem", color: "red" }}
                  />
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_PHOTOS_FOR_DELETE", payload: [] });
                    dispatch({
                      type: "SET_IS_DELETE_PHOTOS_CLICK",
                      payload: false,
                    });
                  }}
                >
                  <span>Cancel</span>
                  <FcCancel style={{ fontSize: "1.25rem" }} />
                </button>
              </>
            )}

            <button
              onClick={() =>
                photosForDelete.length > 0
                  ? dispatch({
                      type: "SET_SHOW_CONFIRMATION_MODAL",
                      payload: true,
                    })
                  : (dispatch({
                      type: "SET_IS_DELETE_PHOTOS_CLICK",
                      payload: true,
                    }),
                    dispatch({ type: "SET_CHANGE_MAIN_CLICK", payload: false }))
              }
            >
              <span>
                {photosForDelete.length > 0 ? "Delete marked" : "Delete photos"}
              </span>
              <ImBin style={{ color: "red" }} />
            </button>

            <button
              onClick={() => {
                dispatch({
                  type: "SET_CHANGE_MAIN_CLICK",
                  payload: !changeMainClick,
                });
                dispatch({ type: "SET_PHOTOS_FOR_DELETE", payload: [] });
                dispatch({
                  type: "SET_IS_DELETE_PHOTOS_CLICK",
                  payload: false,
                });
              }}
            >
              <span>{changeMainClick ? "Cancel" : "Change"}</span>
              <FcStackOfPhotos style={{ fontSize: "1.3rem" }} />
            </button>
          </>
        )}

        {photos.length < 10 && (
          <UploadPhotos entityId={entityId} folder={folder} />
        )}

        {showConfirmationModal && (
          <ConfirmationModal
            deletionObj={
              photosForDelete.length == photos.length
                ? "all photos"
                : "marked photos"
            }
            confirm={handleDeletePhotos}
            cancel={() => {
              dispatch({ type: "SET_SHOW_CONFIRMATION_MODAL", payload: false });
              dispatch({ type: "SET_PHOTOS_FOR_DELETE", payload: [] });
            }}
          />
        )}
      </div>
    </>
  );
};

export default PhotoActionButtons;
