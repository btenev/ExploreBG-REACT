import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import { FaDownload, FaFileUpload } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';

import { LoadingSpinner } from '../common';

import { useDeleteGpxFile, useUploadGpxFile } from '../../hooks/dataHooks/gpxHooks';

interface Props {
  trailId: number;
  track: string | null;
  setGpx: Dispatch<SetStateAction<string | null>>;
  setCreationDate: Dispatch<SetStateAction<string>>;
}

const TrailGpxControls = ({ trailId, track, setGpx, setCreationDate }: Props) => {
  const { mutate: uploadGpxFile, isPending: pendingUpload } = useUploadGpxFile(
    setGpx,
    setCreationDate
  );
  const { mutate: deleteGpxFile, isPending: pendingDelete } = useDeleteGpxFile(
    setGpx,
    setCreationDate
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      uploadGpxFile({
        trailId: trailId.toString(),
        gpxFile: formData,
      });
    }
  };

  const onRemoveGpx = () => {
    deleteGpxFile(trailId.toString());
  };

  return (
    <aside className="map__buttons">
      {(pendingUpload || pendingDelete) && ( //TODO: visaul improvement of the spinner*/
        <div
          className="photos-wrapper__spinner"
          style={{ display: pendingDelete || pendingUpload ? 'flex' : 'none' }}
        >
          <LoadingSpinner
            width={'5rem'}
            height={'5rem'}
            fontSize={'0.65rem'}
            uploadOrDelete={pendingUpload ? 'Uploading' : 'Deleting'}
          />
        </div>
      )}

      {track && (
        <Link to={track} download>
          Download Gpx <FaDownload />
        </Link>
      )}

      {!track && (
        <form>
          <label htmlFor="file-input">
            <span>
              Upload Gpx <FaFileUpload style={{ fontSize: '1.25rem' }} />
            </span>
          </label>
          <input onChange={handleFileUpload} type="file" accept=".gpx" id="file-input" />
        </form>
      )}

      {track && (
        <div onClick={onRemoveGpx}>
          <label>
            <span>
              Remove Gpx <ImBin style={{ color: 'red' }} />
            </span>
          </label>
        </div>
      )}
    </aside>
  );
};

export default TrailGpxControls;
