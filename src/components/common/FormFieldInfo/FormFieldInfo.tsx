import { useRef, useState } from 'react';
import { TiInfo } from 'react-icons/ti';

import './FormFieldInfo.scss';

interface Props {
  infoText: string;
}

const FormFieldInfo = ({ infoText }: Props) => {
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const infoIconRef = useRef<HTMLElement>(null);

  return (
    <figure
      ref={infoIconRef}
      className="form-field-info"
      onClick={() => setIsShowInfo(!isShowInfo)}
    >
      <figcaption className={`text ${isShowInfo ? 'active' : ''}`}>{infoText}</figcaption>
      <TiInfo />
    </figure>
  );
};

export default FormFieldInfo;
