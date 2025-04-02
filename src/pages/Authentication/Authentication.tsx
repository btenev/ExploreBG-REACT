import './Authentication.scss';

import { SmallFooter, SmallHeader } from '../../components/common';
import AuthenticationFormWrapper from '../../components/AuthenticationFormWrapper';

const Authentication = () => {
  return (
    <div className="container">
      <main className="login-register">
        <SmallHeader />

        <AuthenticationFormWrapper />

        <SmallFooter />
      </main>
    </div>
  );
};

export default Authentication;
