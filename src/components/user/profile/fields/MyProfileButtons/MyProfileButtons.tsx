import { useState } from "react";

import { ConfirmationModal } from "@components/common";
import { ChangePasswordPopUp } from "@components/user/auth";

const MyProfileButtons = () => {
  const [isClickDelAccountBtn, setIsClickDelAccountBtn] =
    useState<boolean>(false);
  const [isClickChangePassBtn, setIsClickChangePassBtn] =
    useState<boolean>(false);

  const onConfirmClick = () => {
    console.log("Successful deletion!");
  };

  const onCancelClick = () => {
    setIsClickDelAccountBtn(false);
    setIsClickChangePassBtn(false);
  };

  return (
    <>
      <aside>
        <button onClick={() => setIsClickDelAccountBtn(!isClickDelAccountBtn)}>
          Delete this account
        </button>
        <button onClick={() => setIsClickChangePassBtn(!isClickChangePassBtn)}>
          Change password
        </button>
      </aside>

      {isClickDelAccountBtn && (
        <ConfirmationModal
          deletionObj="Delete this account"
          confirm={onConfirmClick}
          cancel={onCancelClick}
        />
      )}

      {isClickChangePassBtn && (
        <ChangePasswordPopUp closePopUp={onCancelClick} />
      )}
    </>
  );
};

export default MyProfileButtons;
