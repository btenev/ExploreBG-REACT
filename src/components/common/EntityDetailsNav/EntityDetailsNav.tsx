import './EntityDetailsNav.scss';

import { EntityType } from '../../../types';
import DeleteItem from '../DeleteItem';

interface Props {
  canEdit: boolean;
  deletionObj: string;
  entity: EntityType;
  entityId: string;
  imageAvailable: boolean;
  gpxFileAvailable: boolean;
}

const EntityDetailsNav = ({
  canEdit,
  deletionObj,
  entity,
  entityId,
  imageAvailable,
  gpxFileAvailable,
}: Props) => {
  return (
    <nav className="entity-details__nav" aria-label="entity-details-page-navigation">
      {canEdit && deletionObj && (
        <DeleteItem deletionObj={deletionObj} entity={entity} entityId={entityId} />
      )}
      <ul>
        {imageAvailable && (
          <li>
            <a href="#photos">photos</a>
          </li>
        )}
        {gpxFileAvailable && (
          <li>
            <a href="#map">map</a>
          </li>
        )}
        <li>
          <a href="#comments">comments</a>
        </li>
      </ul>
    </nav>
  );
};

export default EntityDetailsNav;
