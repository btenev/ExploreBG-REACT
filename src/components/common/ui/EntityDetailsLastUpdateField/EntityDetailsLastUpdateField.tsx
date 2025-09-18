import { useEffect } from "react";

import { useLastUpdated } from "@context/LastUpdate";
import { formatEntityLastUpdate } from "@utils/dateUtils";

import "./EntityDetailsLastUpdateField.scss";

interface Props {
  lastUpdateDate: string;
}

const EntityDetailsLastUpdateField = ({ lastUpdateDate }: Props) => {
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    setLastUpdated(lastUpdateDate);
  }, [lastUpdateDate, setLastUpdated]);

  return (
    <p className="last-update">
      <em>last update:</em> &nbsp;
      <time dateTime={lastUpdated}>
        {lastUpdated && formatEntityLastUpdate(lastUpdated)}
      </time>
    </p>
  );
};

export default EntityDetailsLastUpdateField;
