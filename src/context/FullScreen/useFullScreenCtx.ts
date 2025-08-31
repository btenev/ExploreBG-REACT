import { useContext } from "react";

import { FullScreenContext } from "./FullScreenContext";

export const useFullScreenCtx = () => {
  const context = useContext(FullScreenContext);

  if (!context) {
    throw new Error(
      "useFullScreenCtx must be used within a FullScreenProvider"
    );
  }

  return context;
};
