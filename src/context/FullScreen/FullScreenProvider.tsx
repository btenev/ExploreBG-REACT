import { ReactNode, useState } from "react";

import { FullScreenContext } from "./FullScreenContext";

export const FullScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};
