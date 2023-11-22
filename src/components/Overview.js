import React, { useContext, useEffect, useRef } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";

const Overview = () => {
  const container = useRef();
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);
  let colorTheme = darkMode ? "dark" : "light";
  let stockSymbol = stocksymbol;

  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "${stockSymbol}",
        "width": 1000,
        "locale": "en",
        "colorTheme": "${colorTheme}",
        "isTransparent": false
      }`;

    container.current.appendChild(script);
  }, [colorTheme, stockSymbol]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default Overview;
