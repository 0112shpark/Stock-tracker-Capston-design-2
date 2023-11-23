import { DocumentChartBarIcon } from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import ModalContext from "../context/ModalContext";

const Predict = () => {
  const { darkMode, setdarkMode } = useContext(ThemeContext);
  const { modal, setmodal } = useContext(ModalContext);

  const setModal = () => {
    setmodal(!modal);
  };

  return (
    <button
      className={`rounded-lg border-1 border-neutral-400 p-2 absolute right-40 xl:right-52 top-20 shadow-lg transition duration-300 hover:scale-125 ${
        darkMode ? "shadow-gray-800" : null
      } `}
      t
      onClick={setModal}
    >
      <DocumentChartBarIcon
        className={`h-8 w-8 cursor-pointer stroke-1 fill-none  ${
          darkMode
            ? "fill-yellow-400 stroke-yellow-400"
            : "fill-none stroke-neutral-400"
        }`}
      ></DocumentChartBarIcon>
    </button>
  );
};

export default Predict;
