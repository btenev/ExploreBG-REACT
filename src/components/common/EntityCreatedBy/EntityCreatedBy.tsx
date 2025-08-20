import './EntityCreatedBy.scss';

import { IOwner } from '../../../types';
import MemberImage from '../MemberImage';

interface Props {
  createdBy: IOwner;
}

const EntityCreatedBy = ({ createdBy }: Props) => {
  return (
    <div className="entity-created-by">
      <p>
        created by:&nbsp;<b>{createdBy.username}</b>
      </p>
      <MemberImage
        ownerId={createdBy.id}
        imageUrl={createdBy.imageUrl}
        username={createdBy.username}
      />
    </div>
  );
};

export default EntityCreatedBy;
