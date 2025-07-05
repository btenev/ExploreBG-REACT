import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUser } from '../../types/shared/user';
import { formatFullDate } from '../../utils/dateUtils';

import AllUsersLockUnlockAccount from '../AllUsersLockUnlockAccount';
import AllUsersEditRole from '../AllUsersEditRole';
import { MemberImage } from '../common';

interface Props {
  users: IUser[];
  isAdmin: boolean;
  staffId: number;
}

const AllUsersTable = ({ users, isAdmin, staffId }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <AiOutlineFieldNumber />
          </th>
          <th>Image</th>
          <th>Username</th>
          <th>Roles</th>
          <th>Creation date</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((u, index) => (
          <tr key={u.id} className={u.accountNonLocked ? '' : 'locked-account'}>
            <td>{users.length - index}</td>
            <td>
              <MemberImage ownerId={u.id} imageUrl={u.imageUrl} username={u.username} />
            </td>
            <td>
              <AllUsersLockUnlockAccount user={u} isAdmin={isAdmin} staffId={staffId} />
            </td>
            <td>
              <AllUsersEditRole user={u} isAdmin={isAdmin} staffId={staffId} />
            </td>
            <td>{formatFullDate(u.creationDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllUsersTable;
