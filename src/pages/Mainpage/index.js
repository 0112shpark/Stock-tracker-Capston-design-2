import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import "./index.css";

import Dashboard from "../../components/Dashboard";
import ThemeContext from "../../context/ThemeContext";
import StockContext from "../../context/StockContext";

import Ticket from "../../components/Ticket";
import LangContext from "../../context/LangContext";

const MainPage = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [stocksymbol, setStockSymbol] = useState("META");
  const [lang, setlang] = useState("en");
  const [data, setdata] = useState([]);

  // useEffect(() => {
  //   fetch("/members", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ stocksymbol }), // Send an object with the key 'stocksymbol'
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setdata(data);
  //       console.log(data);
  //     });
  // }, []);

  return (
    <>
      <div className="container1">
        <Nav />

        <ThemeContext.Provider value={{ darkMode, setdarkMode }}>
          <StockContext.Provider value={{ stocksymbol, setStockSymbol }}>
            <LangContext.Provider value={{ lang, setlang }}>
              <Ticket />
              <Dashboard />
            </LangContext.Provider>
          </StockContext.Provider>
        </ThemeContext.Provider>
      </div>
    </>
  );
};

export default MainPage;
