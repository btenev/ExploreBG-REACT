import { Link } from 'react-router-dom';

import './MemberImage.scss';

import defaultUserImg from '../../../assets/images/user-profile-pic.png';
import { PUBLIC_ROUTES } from '../../../constants';

interface Props {
  ownerId: number;
  imageUrl: string | null;
  username: string;
}

const MemberImage = ({ ownerId, imageUrl, username }: Props) => {
  return (
    <>
      <Link className="member-link" to={PUBLIC_ROUTES.user.getProfile.build(ownerId)}>
        <img
          src={imageUrl ?? defaultUserImg}
          width={40}
          height={40}
          loading="eager"
          alt="User picture"
          title={username}
        />
      </Link>
    </>
  );
};

export default MemberImage;
