import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type LastUpdatedContextType = {
  lastUpdated: string;
  setLastUpdated: Dispatch<SetStateAction<string>>;
};

const LastUpdatedContext = createContext<LastUpdatedContextType | undefined>(undefined);

export const useLastUpdated = () => {
  const context = useContext(LastUpdatedContext);
  if (!context) throw new Error('useLastUpdated must be used within LastUpdatedProvider');
  return context;
};

export const LastUpdatedProvider = ({ children }: { children: React.ReactNode }) => {
  const [lastUpdated, setLastUpdated] = useState<string>('');

  return (
    <LastUpdatedContext.Provider value={{ lastUpdated, setLastUpdated }}>
      {children}
    </LastUpdatedContext.Provider>
  );
};
