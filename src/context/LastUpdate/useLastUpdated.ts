import { useContext } from "react";

import { LastUpdatedContext } from "./LastUpdatedContext";

export const useLastUpdated = () => {
  const context = useContext(LastUpdatedContext);
  if (!context)
    throw new Error("useLastUpdated must be used within LastUpdatedProvider");
  return context;
};
