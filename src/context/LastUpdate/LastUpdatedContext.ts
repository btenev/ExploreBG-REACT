import { createContext, Dispatch, SetStateAction } from "react";

type LastUpdatedContextType = {
  lastUpdated: string;
  setLastUpdated: Dispatch<SetStateAction<string>>;
};

export const LastUpdatedContext = createContext<
  LastUpdatedContextType | undefined
>(undefined);
