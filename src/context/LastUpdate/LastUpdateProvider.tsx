import { useState } from "react";

import { LastUpdatedContext } from "./LastUpdatedContext";

export const LastUpdatedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lastUpdated, setLastUpdated] = useState<string>("");

  return (
    <LastUpdatedContext.Provider value={{ lastUpdated, setLastUpdated }}>
      {children}
    </LastUpdatedContext.Provider>
  );
};
