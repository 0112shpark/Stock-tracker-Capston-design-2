import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";

import Dashboard from "../../components/Dashboard";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";

const MainPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [stocksymbol, setStockSymbol] = useState("FB");
  return (
    <>
      <div className="container1">
        <Nav />
        <ThemeContext.Provider value={{ darkMode, setdarkMode }}>
          <StockContext.Provider value={{ stocksymbol, setStockSymbol }}>
            <Dashboard />
          </StockContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
};

export default MainPage;
