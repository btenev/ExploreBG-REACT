import { Link, useLocation } from "react-router-dom";

import { BackButton } from "@components/common";
import { PUBLIC_ROUTES } from "@constants";

import CommonModal from "../CommonModal";

interface Props {
  message: string;
}

const RequireAuthModal = ({ message }: Props) => {
  const location = useLocation();

  return (
    <CommonModal>
      <p>{message}</p>
      <BackButton />
      <Link to={PUBLIC_ROUTES.authentication} state={{ from: location }}>
        Log in or Register
      </Link>
    </CommonModal>
  );
};

export default RequireAuthModal;
