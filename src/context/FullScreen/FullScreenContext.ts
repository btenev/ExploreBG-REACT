import { createContext, Dispatch, SetStateAction } from "react";

interface FullScreenContextProps {
  isFullScreen: boolean;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

export const FullScreenContext = createContext<
  FullScreenContextProps | undefined
>(undefined);
