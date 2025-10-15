import { useState } from "react";

import { ConfirmationModal } from "@components/common";
import { useDeleteEntity } from "@hooks/dataHooks/crossEntityHooks";
import { DeletableEntityType } from "@types";

import "./DeleteItem.scss";

interface Props {
  deletionObj: string;
  entity: DeletableEntityType;
  entityId: string;
}

const DeleteItem = ({ deletionObj, entity, entityId }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate: deleteEntity } = useDeleteEntity(setIsDialogOpen);

  const handleConfirm = () => {
    deleteEntity({ entityId, entity });
  };

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)} className="delete-item-btn">
        Delete this item
      </button>

      {isDialogOpen && (
        <ConfirmationModal
          deletionObj={deletionObj}
          confirm={handleConfirm}
          cancel={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default DeleteItem;
