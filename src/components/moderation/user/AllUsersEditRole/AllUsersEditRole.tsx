import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { CommonModal } from "@components/common";
import { useUpdateUserRole } from "@hooks/dataHooks/moderation/userModerationHooks";
import { IUser } from "@types";
import { hasRole } from "@utils/mixedUtils";

interface Props {
  user: IUser;
  isAdmin: boolean;
  staffId: number;
}

const AllUsersEditRole = ({ user, isAdmin, staffId }: Props) => {
  const [isClickEdit, setIsClickEdit] = useState<boolean>(false);
  const { mutate: roleToModerator } = useUpdateUserRole();

  const { id, username, roles, accountNonLocked } = user;
  const currentUserFromTableIsModerator = hasRole(roles, "Moderator");
  const currentUserFromTableIsAdmin = hasRole(roles, "Admin");

  const onConfirm = () => {
    if (id === staffId) {
      toast.info("You cannot change your own role.");
      setIsClickEdit(false);
    }

    if (currentUserFromTableIsAdmin) {
      toast.info("You can not change the role of an ADMIN.");
      setIsClickEdit(false);
      return;
    }

    if (!isAdmin && currentUserFromTableIsModerator) {
      toast.info(
        "As a MODERATOR, you are not allowed to change the role of another MODERATOR."
      );

      setIsClickEdit(false);
      return;
    }

    roleToModerator({
      userId: id.toString(),
      moderator: !currentUserFromTableIsModerator,
    });
    setIsClickEdit(false);
  };

  return (
    <>
      <div>
        <ul>
          {user.roles.map((r, index) => (
            <li
              key={index}
              style={{
                listStyle: user.roles.length > 1 ? "disc" : "none",
                color:
                  currentUserFromTableIsAdmin || currentUserFromTableIsModerator
                    ? "yellow"
                    : "",
              }}
            >
              {r.role}
            </li>
          ))}
        </ul>
        {isAdmin && !currentUserFromTableIsAdmin && accountNonLocked && (
          <FaEdit onClick={() => setIsClickEdit(!isClickEdit)} />
        )}
      </div>

      {isClickEdit && (
        <CommonModal>
          <p>
            Are you sure you want to make <b>{username}</b>{" "}
            {currentUserFromTableIsModerator ? "just member" : "a Moderator"}?
          </p>

          <button onClick={onConfirm} className="confirm-btn">
            Yes, please
          </button>
          <button onClick={() => setIsClickEdit(false)}>Cancel</button>
        </CommonModal>
      )}
    </>
  );
};

export default AllUsersEditRole;
