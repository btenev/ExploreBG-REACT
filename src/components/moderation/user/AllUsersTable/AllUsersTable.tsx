import { AiOutlineFieldNumber } from "react-icons/ai";

import { MemberImage } from "@components/common";
import { IUser } from "@types";
import { formatFullDate } from "@utils/dateUtils";

import AllUsersEditRole from "../AllUsersEditRole";
import AllUsersLockUnlockAccount from "../AllUsersLockUnlockAccount";

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
        {users.map((u, index) => (
          <tr key={u.id} className={u.accountNonLocked ? "" : "locked-account"}>
            <td>{users.length - index}</td>
            <td>
              <MemberImage
                ownerId={u.id}
                imageUrl={u.imageUrl}
                username={u.username}
              />
            </td>
            <td>
              <AllUsersLockUnlockAccount
                user={u}
                isAdmin={isAdmin}
                staffId={staffId}
              />
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
