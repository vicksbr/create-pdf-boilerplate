import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useECharts } from "@hcorta/react-echarts";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";

const EchartLine = ({ setImageData }) => {
  const containerRef = useRef();

  const myProps = {
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "30%"],
    },
    series: [
      {
        type: "line",
        data: [
          ["2022-10-12", 750],
          ["2022-10-17", 300],
          ["2022-10-18", 100],
        ],
      },
    ],
    renderer: "canvas",
  };

  useECharts({ containerRef, ...myProps });

  return (
    <div style={{ width: "848px" }}>
      <div ref={containerRef} id={"linechart-id"} style={{ height: "650px" }} />
      <button
        type="button"
        onClick={() =>
          setImageData(containerRef.current.firstChild.firstChild.toDataURL())
        }
      >
        generate
      </button>
    </div>
  );
};

const EchartPie = ({ setImageData }) => {
  const containerRef = useRef();

  const myProps = {
    series: [
      {
        type: "pie",
        data: [
          {
            value: 335,
            name: "Direct Visit",
          },
          {
            value: 234,
            name: "Union Ad",
          },
          {
            value: 1548,
            name: "Search Engine",
          },
        ],
        radius: ["40%", "60%"],
      },
    ],
    renderer: "canvas",
    legend: {
      top: "20%",
      orient: "vertical",
      left: "right",
    },
    tooltip: {
      trigger: "item",
    },
  };

  useECharts({ containerRef, ...myProps });

  return (
    <div style={{ width: "848px" }}>
      <div ref={containerRef} id={"piechart-id"} style={{ height: "650px" }} />
      <button
        type="button"
        onClick={() =>
          setImageData(containerRef.current.firstChild.firstChild.toDataURL())
        }
      >
        Generate
      </button>
    </div>
  );
};

const AppWrapperChartGenerator = () => {
  const [chartDataURL, setChartDataURL] = useState("");
  const [chartSelected, setChartSelected] = useState("pie");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        {chartSelected === "pie" ? (
          <EchartPie setImageData={setChartDataURL} />
        ) : (
          <EchartLine setImageData={setChartDataURL} />
        )}
        <button
          onClick={() =>
            chartSelected === "pie"
              ? setChartSelected("line")
              : setChartSelected("pie")
          }
        >
          change chart
        </button>
      </div>
      {chartDataURL && <App chartDataURL={chartDataURL} />}
    </div>
  );
};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
