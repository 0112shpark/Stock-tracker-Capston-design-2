import React, { useContext, useEffect, useRef } from "react";
import StockContext from "../context/StockContext";
import LangContext from "../context/LangContext";
import ThemeContext from "../context/ThemeContext";

const Recommand = () => {
  const container = useRef();
  const { stocksymbol } = useContext(StockContext);
  const { lang } = useContext(LangContext);
  const { darkMode } = useContext(ThemeContext);
  let colorTheme = darkMode ? "dark" : "light";

  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "interval": "1m",
        "width": "100%",
        "isTransparent": false,
        "height": "100%",
        "symbol": "${stocksymbol}",
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "${lang}",
        "colorTheme": "${colorTheme}"
      }`;

    container.current.appendChild(script);
  }, [colorTheme, lang, stocksymbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default Recommand;
