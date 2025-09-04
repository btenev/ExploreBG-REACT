import { ActiveLink } from "@components/common";
import { PUBLIC_ROUTES, MODERATION_ROUTES } from "@constants";

interface Props {
  isAdminOrModerator: boolean;
}

const UserNavLinks = ({ isAdminOrModerator }: Props) => {
  return (
    <>
      <li>
        <ActiveLink to={PUBLIC_ROUTES.user.myProfile}>My profile</ActiveLink>
      </li>
      <li>
        <ActiveLink to={PUBLIC_ROUTES.trail.create}>Create trail</ActiveLink>
      </li>

      <span>--------------------</span>

      {isAdminOrModerator && (
        <>
          <li>
            <ActiveLink to={MODERATION_ROUTES.user.getAll}>Users</ActiveLink>
          </li>
          <li>
            <ActiveLink to={MODERATION_ROUTES.dashboard}>
              Waiting approval
            </ActiveLink>
          </li>
        </>
      )}
    </>
  );
};

export default UserNavLinks;
