import { Link } from 'react-router-dom';

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
      <Link to="/authentication">Log in or Register</Link>
    </CommonModal>
  );
};

export default RequireAuthModal;
