import { Dispatch, SetStateAction } from 'react';

import { LayersControl, MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { ITrackInfo } from '../../types';
import { BG_GPS_COORDINATES, DEFAULT_MAP_ZOOM } from '../../constants';

import { FullScreenProvider } from '../../context/FullScreenProvider';

import FullScreenMap from '../FullScreenMap';
import GpxLayer from '../GpxLayer';
import CtrlScrollOnMap from '../CtrlScrollOnMap';
import LocateUserOnMap from '../LocateUserOnMap';
import MouseCoordinatesOnMap from '../MouseCoordinatesOnMap';

interface Props {
  width?: string;
  height?: string;
  initialMapPosition?: [number, number];
  initialMapZoom?: number;
  location?: { name: string; position: [number, number] };
  gpxUrl?: string | null;
  setTrackInfo?: Dispatch<SetStateAction<ITrackInfo | null>>;
}

const Map = ({
  width,
  height,
  initialMapPosition,
  initialMapZoom,
  location,
  gpxUrl,
  setTrackInfo,
}: Props) => {
  return (
    <FullScreenProvider>
      <FullScreenMap width={width} height={height}>
        <MapContainer
          center={initialMapPosition ?? BG_GPS_COORDINATES}
          zoom={initialMapZoom ?? DEFAULT_MAP_ZOOM}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OSM Landscape">
              <TileLayer
                url="http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>

            {/* <LayersControl.Overlay name="Marker">
                    
                        </LayersControl.Overlay> */}
          </LayersControl>

          {location && (
            <Marker position={location.position}>
              <Tooltip>{location.name}</Tooltip>
              <Popup>{location.name}</Popup>
            </Marker>
          )}

          {gpxUrl && <GpxLayer url={gpxUrl} setTrackInfo={setTrackInfo!} />}

          <CtrlScrollOnMap />

          <LocateUserOnMap location={location} />

          <MouseCoordinatesOnMap />
        </MapContainer>
      </FullScreenMap>
    </FullScreenProvider>
  );
};

export default Map;
