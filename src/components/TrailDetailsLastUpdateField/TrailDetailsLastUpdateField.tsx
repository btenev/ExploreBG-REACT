import { useEffect } from 'react';

import { useLastUpdated } from '../../context/LastUpdateProvider';
import { formatEntityLastUpdate } from '../../utils/dateUtils';

interface Props {
  lastUpdateDate: string;
}

const TrailDetailsLastUpdateField = ({ lastUpdateDate }: Props) => {
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    setLastUpdated(lastUpdateDate);
  }, [lastUpdateDate, setLastUpdated]);

  return (
    <p className="trail__last-update">
      <em>last update:</em> &nbsp;
      <time dateTime={lastUpdated}>{lastUpdated && formatEntityLastUpdate(lastUpdated)}</time>
    </p>
  );
};

export default TrailDetailsLastUpdateField;
