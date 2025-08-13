import { useState } from 'react';

import './DeleteItem.scss';

import ConfirmationModal from '../ConfirmationModal';
import { useDeleteEntity } from '../../../hooks/dataHooks/useDeleteEntity';
import { EntityType } from '../../../types';

interface Props {
  deletionObj: string;
  entity: EntityType;
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
