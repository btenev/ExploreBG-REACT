import { useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { GiSun } from "react-icons/gi";

import { useTheme } from "@context/Theme";

export const SwitchTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHoovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setIsHoovered(true)}
      onMouseLeave={() => setIsHoovered(false)}
      onClick={() => toggleTheme()}
      className="header__nav__theme-lang__theme"
    >
      {theme === "light" ? (
        <BsMoonStarsFill
          className={isHovered ? "header__nav__theme-lang__theme__moon" : ""}
        />
      ) : (
        <GiSun
          className={isHovered ? "header__nav__theme-lang__theme__sun" : ""}
        />
      )}
    </span>
  );
};
