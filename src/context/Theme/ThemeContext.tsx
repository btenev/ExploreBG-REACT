import { createContext } from "react";

export type ThemeOptions = "light" | "dark";

export interface ThemeContextProps {
  theme: ThemeOptions;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
