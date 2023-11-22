import React, { useContext, useEffect, useRef } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import Lang from "./Lang";
import LangContext from "../context/LangContext";

const Overview = () => {
  const container = useRef();
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);
  const { lang } = useContext(LangContext);
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
        "width": "100%",
        "locale": "${lang}",
        "colorTheme": "${colorTheme}",
        "isTransparent": false
      }`;

    container.current.appendChild(script);
  }, [colorTheme, lang, stockSymbol]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default Overview;
