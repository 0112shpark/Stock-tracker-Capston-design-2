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
  ReferenceLine,
} from "recharts";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import { fetchHistoricalData } from "../api/Stock-api";
import StockContext from "../context/StockContext";

const Chart = () => {
  const [data, setdata] = useState([]);
  const [newdata, setnewdata] = useState([]);
  const [Filter, setFilter] = useState("1W");
  const { darkMode } = useContext(ThemeContext);
  const { stocksymbol } = useContext(StockContext);

  const getTodayIndex = () => {
    const today = new Date();
    const todayString = convertUnixTimestampToDate(
      convertDateToUnixTimestamp(today)
    );
    const todayIndex = data.findIndex((item) => item.date === todayString);
    return todayIndex;
  };

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[Filter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const jsonData = {
      0: { value: 190.69000244140625, date: "2023. 11. 17." },
      1: { value: 191.77000427246094, date: "2023. 11. 20." },
      2: { value: 192.83999633789062, date: "2023. 11. 21." },
      3: { value: 193.88999938964844, date: "2023. 11. 22." },
      4: { value: 194.91000366210938, date: "2023. 11. 23." },
      5: { value: 195.91000366210938, date: "2023. 11. 24." },
      6: { value: 196.88999938964844, date: "2023. 11. 27." },
      7: { value: 197.83999633789062, date: "2023. 11. 28." },
      8: { value: 198.77000427246094, date: "2023. 11. 29." },
      9: { value: 199.6699981689453, date: "2023. 11. 30." },
      10: { value: 200.5500030517578, date: "2023. 12. 01." },
      11: { value: 201.41000366210938, date: "2023. 12. 04." },
      12: { value: 202.24000549316406, date: "2023. 12. 05." },
      13: { value: 203.0500030517578, date: "2023. 12. 06." },
      14: { value: 203.8300018310547, date: "2023. 12. 07." },
      15: { value: 204.60000610351562, date: "2023. 12. 08." },
      16: { value: 205.33999633789062, date: "2023. 12. 11." },
      17: { value: 206.05999755859375, date: "2023. 12. 12." },
      18: { value: 206.75, date: "2023. 12. 13." },
      19: { value: 207.42999267578125, date: "2023. 12. 14." },
      20: { value: 208.0800018310547, date: "2023. 12. 15." },
      21: { value: 208.72000122070312, date: "2023. 12. 18." },
      22: { value: 209.33999633789062, date: "2023. 12. 19." },
      23: { value: 209.92999267578125, date: "2023. 12. 20." },
      24: { value: 210.50999450683594, date: "2023. 12. 21." },
      25: { value: 211.07000732421875, date: "2023. 12. 22." },
      26: { value: 211.61000061035156, date: "2023. 12. 25." },
      27: { value: 212.1300048828125, date: "2023. 12. 26." },
      28: { value: 212.63999938964844, date: "2023. 12. 27." },
      29: { value: 213.1300048828125, date: "2023. 12. 28." },
    };

    function convertJsonToArray(jsonData) {
      // jsonData 객체의 키를 배열로 추출
      const keys = Object.keys(jsonData);

      // 배열로 변환할 결과를 담을 빈 배열
      const dataArray = [];

      // 키 배열을 순회하면서 데이터를 배열로 변환
      keys.forEach((key) => {
        const item = jsonData[key];
        dataArray.push({
          value: item.value.toFixed(2),
          date: item.date,
        });
      });

      return dataArray;
    }

    // 함수 호출
    const resultArray = convertJsonToArray(jsonData);

    // 변환된 배열 출력
    //console.log(resultArray);

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
        const newData = formatData(result);

        if (Filter === "P") {
          const updatedData = newData.concat(resultArray);

          setdata(updatedData);
          console.log(updatedData);
        } else {
          setdata(newData);
        }
      } catch (error) {
        setdata([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stocksymbol, Filter]);

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
            <linearGradient id="chartColorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />

          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
            //cursor={{ stroke: "red", strokeWidth: 2 }}
          ></Tooltip>
          <ReferenceLine x="2023. 11. 17." stroke="red" label="Today" />
          <XAxis dataKey={"date"}></XAxis>
          <YAxis
            domain={
              Filter === "1Y"
                ? ["dataMin-50", "dataMax+50"]
                : ["dataMin", "dataMax"]
            }
          ></YAxis>
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
