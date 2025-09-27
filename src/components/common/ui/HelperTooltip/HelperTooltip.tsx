import { FaInfoCircle } from "react-icons/fa";

import "./HelperTooltip.scss";

interface Props {
  message: string;
}

const HelperTooltip = ({ message }: Props) => {
  return (
    <div className="tooltip-wrapper">
      <FaInfoCircle className="helper-icon" />
      <span className="tooltip-text">{message}</span>
    </div>
  );
};

export default HelperTooltip;
