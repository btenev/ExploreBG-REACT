import { JSX } from 'react';
import { BsThermometerSun } from 'react-icons/bs';
import { FaSnowflake } from 'react-icons/fa6';
import { GiBeech, GiFallingLeaf } from 'react-icons/gi';

import './TrailDetailsSeasonVisited.scss';

interface Props {
  season?: string | null;
}

const seasonIcons: Record<string, JSX.Element> = {
  spring: <GiBeech className="trail__season--spring" />,
  summer: <BsThermometerSun className="trail__season--summer" />,
  autumn: <GiFallingLeaf className="trail__season--autumn" />,
  winter: <FaSnowflake className="trail__season--winter" />,
};

const TrailDetailsSeasonVisited = ({ season }: Props) => {
  const normalized = season?.toLowerCase();
  const icon = normalized ? seasonIcons[normalized] : null;
  return (
    <p className="trail__season">
      {icon ? (
        <>
          {icon}&nbsp; visited in:&nbsp;{season}
        </>
      ) : (
        'not-available'
      )}
    </p>
  );
};

export default TrailDetailsSeasonVisited;
