import { Link } from 'react-router-dom';

import { PUBLIC_ROUTES } from '../../../constants';
import BackButton from '../BackButton';
import CommonModal from '../CommonModal';

interface Props {
  message: string;
}

const RequireAuthModal = ({ message }: Props) => {
  return (
    <CommonModal>
      <p>{message}</p>
      <BackButton />
      <Link to={PUBLIC_ROUTES.authentication}>Log in or Register</Link>
    </CommonModal>
  );
};

export default RequireAuthModal;
