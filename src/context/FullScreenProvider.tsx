import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface FullScreenContextProps {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

const FullScreenContext = createContext<FullScreenContextProps | undefined>(undefined);

export const useFullScreenCtx = () => {
  const context = useContext(FullScreenContext);

  if (!context) {
    throw new Error('useFullScreenCtx must be used within a FullScreenProvider');
  }

  return context;
};

export const FullScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};
