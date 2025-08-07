import { ReactNode, useRef, useState } from 'react';
import { BsEyeFill } from 'react-icons/bs';

import '../FormFieldInfo/FormFieldInfo.scss';

import useCloseOnEscapeTabAndClickOutside from '../../../hooks/uiHooks/useCloseOnEscapeTabClick';

interface Props {
  details?: string;
  element?: ReactNode;
}

const ViewDetails = ({ details, element }: Props) => {
  const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
  const infoIconRef = useRef<HTMLElement>(null);

  useCloseOnEscapeTabAndClickOutside(infoIconRef, () => setIsShowInfo(false));

  return (
    <figure
      ref={infoIconRef}
      className="form-field-info"
      onClick={() => setIsShowInfo(!isShowInfo)}
    >
      <figcaption className={`text ${isShowInfo ? 'active' : ''}`}>
        {details}
        {element}
      </figcaption>
      <BsEyeFill />
    </figure>
  );
};

export default ViewDetails;
