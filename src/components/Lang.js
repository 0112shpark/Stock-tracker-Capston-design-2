import { LanguageIcon } from "@heroicons/react/20/solid";
import React, { useContext } from "react";

import LangContext from "../context/LangContext";
import ThemeContext from "../context/ThemeContext";

const Lang = () => {
  const { lang, setlang } = useContext(LangContext);
  const { darkMode, setdarkMode } = useContext(ThemeContext);
  const toggleLang = () => {
    if (lang === "en") {
      setlang("kr");
    } else {
      setlang("en");
    }
  };

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-24 xl:right-36 top-20 shadow-lg transition duration-300 hover:scale-125 ${
        darkMode ? "shadow-gray-800" : null
      } `}
      t
      onClick={toggleLang}
    >
      <LanguageIcon
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none  ${
          darkMode
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      ></LanguageIcon>
    </button>
  );
};

export default Lang;
