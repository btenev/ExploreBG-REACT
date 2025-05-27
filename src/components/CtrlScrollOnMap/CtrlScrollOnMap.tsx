import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';

import { MAP_FUNCTIONALITIES_BACKGR_COLOR } from '../../constants';

import { useFullScreenCtx } from '../../context/FullScreenProvider';

const CtrlScrollOnMap = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { isFullScreen } = useFullScreenCtx();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const map = useMap();
  const ctrlPressedRef = useRef(false);
  const isFullScreenRef = useRef(isFullScreen);

  useEffect(() => {
    isFullScreenRef.current = isFullScreen;
  }, [isFullScreen]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!ctrlPressedRef.current && !isFullScreenRef.current) {
        map.scrollWheelZoom.disable();
        setShowMessage(true);

        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current);
        }

        messageTimeoutRef.current = setTimeout(() => {
          setShowMessage(false);
        }, 1500);

        e.preventDefault();
      } else {
        map.scrollWheelZoom.enable();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        ctrlPressedRef.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
        ctrlPressedRef.current = false;
      }
    };

    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleScroll, { passive: false });
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', handleScroll);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, [map]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {showMessage && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: MAP_FUNCTIONALITIES_BACKGR_COLOR,
            color: 'black',
            padding: '0.25rem',
            borderRadius: '0.25rem',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          Press &apos;Ctrl&apos; + scroll to zoom the map
        </div>
      )}
    </div>
  );
};

export default CtrlScrollOnMap;
