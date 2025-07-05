import { useState } from 'react';

import { toast } from 'react-toastify';

import { FaEdit } from 'react-icons/fa';

import { IUser } from '../../types/shared/user';
import { CommonModal } from '../common';
import { hasRole } from '../../utils/mixedUtils';
import { useUpdateUserRole } from '../../hooks/dataHooks/superUserHooks';

interface Props {
  user: IUser;
  isAdmin: boolean;
  staffId: number;
}

const AllUsersEditRole = ({ user, isAdmin, staffId }: Props) => {
  const [isClickEdit, setIsClickEdit] = useState<boolean>(false);
  const { mutate: useRoleToModerator } = useUpdateUserRole();

  const { id, username, roles, accountNonLocked } = user;
  const currentUserFromTableIsModerator = hasRole(roles, 'Moderator');
  const currentUserFromTableIsAdmin = hasRole(roles, 'Admin');

  const onConfirm = () => {
    if (id === staffId) {
      toast.info('You cannot change your own role.');
      setIsClickEdit(false);
    }

    if (currentUserFromTableIsAdmin) {
      toast.info('You can not change the role of an ADMIN.');
      setIsClickEdit(false);
      return;
    }

    if (!isAdmin && currentUserFromTableIsModerator) {
      toast.info('As a MODERATOR, you are not allowed to change the role of another MODERATOR.');

      setIsClickEdit(false);
      return;
    }

    useRoleToModerator({ userId: id.toString(), moderator: !currentUserFromTableIsModerator });
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
                listStyle: user.roles.length > 1 ? 'disc' : 'none',
                color:
                  currentUserFromTableIsAdmin || currentUserFromTableIsModerator ? 'yellow' : '',
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
            Are you sure you want to make <b>{username}</b>{' '}
            {currentUserFromTableIsModerator ? 'just member' : 'a Moderator'}?
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
