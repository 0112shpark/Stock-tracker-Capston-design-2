import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";

import Dashboard from "../../components/Dashboard";
import ThemeContext from "../../context/ThemeContext";

const MainPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  return (
    <>
      <div className="container1">
        <Nav />
        <ThemeContext.Provider value={{ darkMode, setdarkMode }}>
          <Dashboard />
        </ThemeContext.Provider>
      </div>
    </>
  );
};

export default MainPage;
