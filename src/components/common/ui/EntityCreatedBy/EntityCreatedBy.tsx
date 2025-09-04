import { IOwner } from "@types";

import MemberImage from "../MemberImage";

import "./EntityCreatedBy.scss";

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
