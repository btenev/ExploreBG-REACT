import { useState } from 'react';
import { TiInfo } from 'react-icons/ti';

import './PasswordInfto.scss';
import { passMinLength } from '../../schemas/fields';

const PasswordInfo = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const specialChars = ` ( ! @ # $ % ^ & * ( ) , . ? " : { } | < > ) `;

  return (
    <figure className="password-info" onClick={() => setShowInfo(!showInfo)}>
      <figcaption className={`info ${showInfo ? 'active' : ''}`}>
        Your password must contain at least one uppercase letter, one lowercase letter, one number,
        one special character {specialChars}, and be at least {passMinLength} characters long.
      </figcaption>
      <TiInfo />
    </figure>
  );
};

export default PasswordInfo;
