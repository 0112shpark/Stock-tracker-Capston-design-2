import React, { useContext, useState, useEffect } from "react";
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from "../helpers/date-helpers";
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from "recharts";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import { fetchHistoricalData } from "../api/Stock-api";
import StockContext from "../context/StockContext";

const Chart = () => {
  const [data, setdata] = useState([]);
  const [Filter, setFilter] = useState("1W");
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[Filter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[Filter].resolution;
        const result = await fetchHistoricalData(
          stocksymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setdata(formatData(result));
      } catch (error) {
        setdata([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stocksymbol, Filter]);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };
  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={Filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          ></Area>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
            //cursor={{ stroke: "red", strokeWidth: 2 }}
          ></Tooltip>
          <XAxis dataKey={"date"}></XAxis>
          <YAxis domain={("dataMin", "dataMax")}></YAxis>
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
