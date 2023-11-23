import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/Stock-api";
import Predict from "./Predict";
import Modalopen from "./modalopen";
import ModalContext from "../context/ModalContext";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);
  const [stockDetails, setstockDetails] = useState({});
  const [quote, setquote] = useState({});
  const { modal, setmodal } = useContext(ModalContext);
  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stocksymbol);
        setstockDetails(result);
      } catch (error) {
        setstockDetails({});
        console.error(error);
      }
    };
    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stocksymbol);
        setquote(result);
      } catch (error) {
        setquote({});
        console.error(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stocksymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className=" col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
        <Overview />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
        <Predict />
      </div>

      <div className="row-span-2 xl:row-span-4">
        <Details details={stockDetails} />
      </div>
      {modal && <Modalopen />}
    </div>
  );
};

export default Dashboard;
