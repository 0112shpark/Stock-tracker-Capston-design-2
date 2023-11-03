import { MoonIcon } from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Theme = () => {
  const { darkMode, setdarkMode } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setdarkMode(!darkMode);
  };

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-8 xl:right-32 shadow-lg ${
        darkMode ? "shadow-gray-800" : null
      }`}
      onClick={toggleDarkMode}
    >
      <MoonIcon
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none  ${
          darkMode
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      ></MoonIcon>
    </button>
  );
};

export default Theme;
