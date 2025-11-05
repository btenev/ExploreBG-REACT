import { useState } from "react";
import { FaEdit } from "react-icons/fa";

import { CommonModal, SubmitButton } from "@components/common";
import { useUpdateUserField } from "@hooks/dataHooks/userHooks";
import { useUserInfoForm } from "@hooks/formHooks/userHooks";
import { UserInfoDto } from "@schemas/user";

interface Props {
  userInfo: string | null;
}

const MyProfileInfoField = ({ userInfo }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { handleSubmit, register, formState, reset, getValues } =
    useUserInfoForm({ userInfo });
  const { isDirty, errors } = formState;

  const { mutate: updateUserInfo, isPending } = useUpdateUserField("userInfo");

  const onSubmit = (data: UserInfoDto) => {
    if (!isDirty) {
      setIsEditing(false);
      return;
    }

    const normilizedData = {
      ...data,
      userInfo:
        data.userInfo && data.userInfo.trim() !== ""
          ? data.userInfo.trim()
          : null,
    };

    updateUserInfo(normilizedData, {
      onSuccess: (response) => {
        reset({ ...getValues(), ...response });
        requestAnimationFrame(() => setIsEditing(false));
      },
    });
    setIsEditing(false);
  };

  return (
    <div>
      <p className="info-text">
        {getValues("userInfo") ?? (
          <>
            <span>My info: </span>
            <strong>.........</strong>
          </>
        )}
        <FaEdit className="edit" onClick={() => setIsEditing(!isEditing)} />
      </p>

      {isEditing && (
        <CommonModal>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="textarea-form"
          >
            <textarea
              id="userInfo"
              {...register("userInfo")}
              // cols={30} rows={10}
              placeholder=" ........"
            />

            <div>
              <SubmitButton isSubmitting={isPending} buttonName="Change" />
              <button type="button" onClick={() => setIsEditing(!isEditing)}>
                Cancel
              </button>
            </div>
          </form>

          {errors.userInfo && (
            <div className="error-message">{errors.userInfo.message}</div>
          )}
        </CommonModal>
      )}
    </div>
  );
};

export default MyProfileInfoField;
