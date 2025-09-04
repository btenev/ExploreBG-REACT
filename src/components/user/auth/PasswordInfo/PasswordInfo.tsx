import { useState } from "react";
import { TiInfo } from "react-icons/ti";

import { PASSWORD_MIN_LENGTH } from "@constants";

import "./PasswordInfto.scss";

const PasswordInfo = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const specialChars = ` ( ! @ # $ % ^ & * ( ) , . ? " : { } | < > ) `;

  return (
    <figure className="password-info" onClick={() => setShowInfo(!showInfo)}>
      <figcaption className={`info ${showInfo ? "active" : ""}`}>
        Your password must contain at least one uppercase letter, one lowercase
        letter, one number, one special character {specialChars}, and be at
        least {PASSWORD_MIN_LENGTH} characters long.
      </figcaption>
      <TiInfo />
    </figure>
  );
};

export default PasswordInfo;
