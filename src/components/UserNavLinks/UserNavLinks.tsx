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
            <ActiveLink to={'/moderation/users'}>Users</ActiveLink>
          </li>
          <li>
            <ActiveLink to={'/moderation/dashboard/waiting-approval/count'}>
              Waiting approval
            </ActiveLink>
          </li>
        </>
      )}
    </>
  );
};

export default UserNavLinks;
