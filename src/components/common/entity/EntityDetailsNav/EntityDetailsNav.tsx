import { DeletableEntityType } from "@types";

import DeleteItem from "./DeleteItem";

import "./EntityDetailsNav.scss";

interface Props {
  canEdit: boolean;
  deletionObj: string;
  entity: DeletableEntityType;
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
    <nav
      className="entity-details__nav"
      aria-label="entity-details-page-navigation"
    >
      {canEdit && deletionObj && (
        <DeleteItem
          deletionObj={deletionObj}
          entity={entity}
          entityId={entityId}
        />
      )}
      <ul>
        <li>
          <a
            href="#photos"
            className={`entity-details__nav-link ${!imageAvailable ? "disabled" : ""}`}
            tabIndex={imageAvailable ? 0 : -1}
          >
            photos
          </a>
        </li>

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
