import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import './MyProfilePhotoField.scss';

import defaultUserImg from '../../assets/images/user-profile-pic.png';
import { useUpdateUserPhoto } from '../../hooks/dataHooks/userHooks';
import { useUserImage } from '../../utils/sessionUtils';
import { compressImage } from '../../utils/imageCompressor';

interface Props {
  initialImageUrl: string | null;
}

const MyProfilePhotoField = ({ initialImageUrl }: Props) => {
  const { mutate: userPhoto, isPending } = useUpdateUserPhoto();
  const userImage = useUserImage() ?? initialImageUrl ?? defaultUserImg;
  const lastUploadedFileRef = useRef<File | null>(null);

  const changePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';

    if (!file) return;

    if (
      lastUploadedFileRef.current?.name === file.name &&
      lastUploadedFileRef.current?.size === file.size
    ) {
      toast.info('This image has already been uploaded.');
      return;
    }

    lastUploadedFileRef.current = file;

    const compressedFile = await compressImage(file);

    if (compressedFile) {
      const data = { folder: 'Users' };
      const formData = new FormData();

      formData.append('data', JSON.stringify(data));
      formData.append('file', compressedFile);

      userPhoto(formData);
    }
  };

  return (
    <form className="image-wrapper">
      <label htmlFor="file-input" tabIndex={0} aria-label="Upload profile photo">
        <img
          src={userImage}
          width={200}
          height={200}
          alt="User photo"
          loading="eager"
          title="User photo"
        />
      </label>

      <input
        onChange={changePhoto}
        type="file"
        accept="image/*"
        name="img"
        id="file-input"
        disabled={isPending}
      />
    </form>
  );
};

export default MyProfilePhotoField;
