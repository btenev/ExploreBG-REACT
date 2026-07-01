import { ActiveLink } from "@components/common";
import { APP_ROUTES } from "@constants";

interface Props {
  isAdminOrModerator: boolean;
}

const UserNavLinks = ({ isAdminOrModerator }: Props) => {
  return (
    <>
      <li>
        <ActiveLink to={APP_ROUTES.user.myProfile}>My profile</ActiveLink>
      </li>
      <li>
        <ActiveLink to={APP_ROUTES.trail.create}>Create trail</ActiveLink>
      </li>

      <span>--------------------</span>

      {isAdminOrModerator && (
        <>
          <li>
            <ActiveLink to={APP_ROUTES.moderation.users}>Users</ActiveLink>
          </li>
          <li>
            <ActiveLink to={APP_ROUTES.moderation.dashboard}>
              Waiting approval
            </ActiveLink>
          </li>
        </>
      )}
    </>
  );
};

export default UserNavLinks;
