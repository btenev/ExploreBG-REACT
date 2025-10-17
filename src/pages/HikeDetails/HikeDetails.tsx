import {
  EntityDetailsNav,
  EntityDetailsWrapper,
  ImportantNotice,
} from "@components/common";
import { useGetHike } from "@hooks/dataHooks/hikeHooks";

import "./HikeDetails.scss";

const HikeDetails = () => {
  return (
    <EntityDetailsWrapper
      entityType="hike"
      paramName="hikeId"
      fetchHook={useGetHike}
    >
      {(hike, canEdit, userId) => (
        <main className="hike-details">
          <h1>{`${hike.startPoint} - ${hike.endPoint} - hike details`}</h1>

          {!canEdit && <ImportantNotice />}

          <EntityDetailsNav
            canEdit={canEdit}
            deletionObj="this hike"
            entity="hike"
            entityId={hike.id.toString()}
            imageAvailable={false}
            gpxFileAvailable={false}
          />
        </main>
      )}
    </EntityDetailsWrapper>
  );
};

export default HikeDetails;
