import React, { useContext, useEffect, useRef } from "react";
import ThemeContext from "../context/ThemeContext";
import LangContext from "../context/LangContext";

const Ticket = () => {
  const container = useRef();
  const { darkMode } = useContext(ThemeContext);
  const lang = useContext(LangContext);
  let colorTheme = darkMode ? "dark" : "light";
  useEffect(() => {
    container.current.innerHTML = "";
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "description": "",
            "proName": "NASDAQ:TSLA"
          },
          {
            "description": "",
            "proName": "NASDAQ:AAPL"
          },
          {
            "description": "",
            "proName": "NASDAQ:MSFT"
          },
          {
            "description": "",
            "proName": "NASDAQ:GOOGL"
          },
          {
            "description": "",
            "proName": "KRX:035420"
          },
          {
            "description": "",
            "proName": "FX_IDC:USDKRW"
          },
          {
            "description": "KAKAO",
            "proName": "KRX:035720"
          },
          {
            "description": "NAVER",
            "proName": "KRX:035420"
          },
          {
            "description": "삼성전자",
            "proName": "KRX:005930"
          },
          {
            "description": "NVDIA",
            "proName": "NASDAQ:NVDA"
          }
        ],
     
      "showSymbolLogo": true,
      "colorTheme": "${colorTheme}",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "${lang}"
}
`;

    container.current.appendChild(script);
  }, [colorTheme, lang]); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ position: "fixed", top: "70px" }}
    >
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

export default Ticket;
