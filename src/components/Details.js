import React, { useContext, useEffect, useRef } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";

const Details = ({ details }) => {
  const container = useRef();
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);
  let colorTheme = darkMode ? "dark" : "light";
  let stockSymbol = stocksymbol;

  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "${colorTheme}",
        "isTransparent": false,
        "largeChartUrl": "",
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "symbol": "${stockSymbol}",
        "locale": "en"
      }`;

    container.current.appendChild(script);
  }, [colorTheme, stockSymbol]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default Details;
