import { ReactNode, useEffect, useRef } from 'react';

import { useFullScreenCtx } from '../../context/FullScreenProvider';

import { MAP_FUNCTIONALITIES_BACKGR_COLOR } from '../../constants';

interface Props {
  children: ReactNode;
  width?: string;
  height?: string;
}

const FullScreenMap = ({ children, width, height }: Props) => {
  const { isFullScreen, setIsFullScreen } = useFullScreenCtx();

  const mapRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && mapRef.current) {
      mapRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setIsFullScreen]);

  return (
    <div
      ref={mapRef}
      style={{
        width: width ?? '100%',
        height: height ?? '31.25rem',
        borderRadius: '0.5rem',
        position: 'relative',
      }}
    >
      {children}

      <button
        onClick={toggleFullscreen}
        aria-pressed={isFullScreen}
        aria-label={isFullScreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '0',
          zIndex: 1000,
          padding: '0.5rem',
          backgroundColor: MAP_FUNCTIONALITIES_BACKGR_COLOR,
          color: 'black',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '0.25rem',
        }}
      >
        {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
      </button>
    </div>
  );
};

export default FullScreenMap;
