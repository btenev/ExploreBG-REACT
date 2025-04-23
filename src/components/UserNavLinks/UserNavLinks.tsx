import { ActiveLink } from '../common';

interface Props {
  isAdminOrModerator: boolean;
}

const UserNavLinks = ({ isAdminOrModerator }: Props) => {
  return (
    <>
      <li>
        <ActiveLink to={'/users/my-profile'}>My profile</ActiveLink>
      </li>
      <li>
        <ActiveLink to={'/trails/create'}>Create trail</ActiveLink>
      </li>

      <span>--------------------</span>

      {isAdminOrModerator && (
        <>
          <li>
            <ActiveLink to={'/admin/users'}>Users</ActiveLink>
          </li>
          <li>
            <ActiveLink to={'/admin/waiting-approval'}>Waiting approval</ActiveLink>
          </li>
        </>
      )}
    </>
  );
};

export default UserNavLinks;
