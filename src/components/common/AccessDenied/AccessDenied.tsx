import './AccessDenied.scss';

import BackButton from '../BackButton';
import CommonModal from '../CommonModal';
import Logo from '../Logo';

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <Logo />

      <CommonModal>
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <p>Please contact your administrator if you believe this is an error.</p>
        <BackButton />
      </CommonModal>
    </div>
  );
};

export default AccessDenied;
