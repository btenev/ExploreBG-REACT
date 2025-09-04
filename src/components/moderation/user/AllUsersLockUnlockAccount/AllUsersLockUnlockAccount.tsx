import { useState } from "react";
import { CiUnlock } from "react-icons/ci";
import { FaUserLock } from "react-icons/fa";
import { toast } from "react-toastify";

import { CommonModal } from "@components/common";
import { useToggleAccountLock } from "@hooks/dataHooks/moderation/userModerationHooks";
import { IUser } from "@types";
import { hasRole } from "@utils/mixedUtils";

interface Props {
  user: IUser;
  isAdmin: boolean;
  staffId: number;
}

const AllUsersLockUnlockAccount = ({ user, isAdmin, staffId }: Props) => {
  const [isClickLockUnlockAccount, setIsClickLockUnlockAccount] =
    useState<boolean>(false);
  const { mutate: toggleAccountStatus } = useToggleAccountLock();

  const { id, username, accountNonLocked, roles } = user;
  const currentUserFromTableIsModerator = hasRole(roles, "Moderator");
  const currentUserFromTableIsAdmin = hasRole(roles, "Admin");

  const onConfirm = () => {
    if (id === staffId) {
      toast.info("You cannot lock  your own account.");

      setIsClickLockUnlockAccount(false);
      return;
    }

    if (currentUserFromTableIsAdmin) {
      toast.info("You can not lock the account of an ADMIN.");
      setIsClickLockUnlockAccount(false);
      return;
    }

    if (!isAdmin && currentUserFromTableIsModerator) {
      toast.info(
        "As a MODERATOR, you are not allowed to lock the account of another MODERATOR."
      );

      setIsClickLockUnlockAccount(false);
      return;
    }

    toggleAccountStatus({
      userId: id.toString(),
      lockAccount: accountNonLocked,
    });
    setIsClickLockUnlockAccount(false);
  };

  return (
    <>
      {username} &nbsp;&nbsp;
      <span
        onClick={() => setIsClickLockUnlockAccount(true)}
        className="lock-unlock-icon"
      >
        {accountNonLocked ? <CiUnlock /> : <FaUserLock />}
      </span>
      {isClickLockUnlockAccount && (
        <CommonModal>
          <p>
            Are you sure you want to {accountNonLocked ? "lock" : "unlock"}{" "}
            <b>{username}</b>&apos;s account?
          </p>

          <button onClick={onConfirm} className="confirm-btn">
            Yes, please
          </button>
          <button onClick={() => setIsClickLockUnlockAccount(false)}>
            Cancel
          </button>
        </CommonModal>
      )}
    </>
  );
};

export default AllUsersLockUnlockAccount;
