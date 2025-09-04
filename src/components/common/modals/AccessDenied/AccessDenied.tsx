import { BackButton } from "@components/common";
import { Logo } from "@components/common";

import CommonModal from "../CommonModal";

import "./AccessDenied.scss";

const AccessDenied = () => {
  return (
    <div className="access-denied">
      <Logo />

      <CommonModal>
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <p>
          Please contact your administrator if you believe this is an error.
        </p>
        <BackButton />
      </CommonModal>
    </div>
  );
};

export default AccessDenied;
