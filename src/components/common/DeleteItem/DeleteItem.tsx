import { useState } from 'react';

import './DeleteItem.scss';

import ConfirmationModal from '../ConfirmationModal';
import { EntityType, useDeleteEntity } from '../../../hooks/dataHooks/useDeleteEntity';

interface Props {
  deletionObj: string;
  entity: EntityType;
  id: string;
}

const DeleteItem = ({ deletionObj, entity, id }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate: deleteEntity } = useDeleteEntity(setIsDialogOpen);

  const handleConfirm = () => {
    deleteEntity({ id, entity });
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
