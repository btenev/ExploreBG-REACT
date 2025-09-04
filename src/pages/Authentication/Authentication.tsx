import { SmallFooter, SmallHeader } from "@components/common";
import { AuthenticationFormWrapper } from "@components/user/auth";

import "./Authentication.scss";

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
