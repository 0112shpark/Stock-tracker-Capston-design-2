import React, { useContext, useRef } from "react";
import "./modalopen.css";
import useOnClickOutside from "../hooks/useOutside";
import ModalContext from "../context/ModalContext";
import Recommand from "./Recommand";
import ThemeContext from "../context/ThemeContext";

const Modalopen = () => {
  const ref = useRef();
  const { darkMode } = useContext(ThemeContext);
  const { modal, setmodal } = useContext(ModalContext);
  useOnClickOutside(ref, () => {
    setmodal(false);
  });
  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div
          className={`modal ${
            darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
          }`}
          ref={ref}
        >
          <span onClick={() => setmodal(false)} className="modal-close">
            X
          </span>
          <p>Recommandation</p>
          <Recommand />
        </div>
      </div>
    </div>
  );
};

export default Modalopen;
