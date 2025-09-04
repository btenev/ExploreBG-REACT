import { BackButton } from "@components/common";

import CommonModal from "../CommonModal";

interface Props {
  message: string;
}

const NotFoundModal = ({ message }: Props) => {
  return (
    <CommonModal>
      <h3>Not Found</h3>
      <p>{message}</p>

      <BackButton />
    </CommonModal>
  );
};

export default NotFoundModal;
