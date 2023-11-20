import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";

import Dashboard from "../../components/Dashboard";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";

const MainPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [stocksymbol, setStockSymbol] = useState("FB");
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stocksymbol }), // Send an object with the key 'stocksymbol'
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      });
  }, []);

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
