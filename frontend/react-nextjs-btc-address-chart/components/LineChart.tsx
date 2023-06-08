import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartOptions } from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { APIData, Filters, Wallets } from "../types";

const options = {
  plugins: {
    title: {
      text: "BTC Address Balances over Time",
      display: true,
    },
    legend: {
      labels: {
        font: {
          size: 10,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 1,
      borderWidth: 1,
      hoverRadius: 3,
      hoverBorderWidth: 3,
    },
  },
  pan: {
    enabled: true,
    mode: "xy",
  },
  zoom: {
    enabled: true,
    mode: "xy",
  },
  responsive: true,
  scales: {
    x: {
      type: "time" as const,
      time: {
        unit: "year" as const,
      },
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      title: {
        display: true,
        text: "Number of BTC Wallets",
      },
    },
  },
};

const LineChart = (props: { apiData: APIData }) => {
  const chartRef = useRef(null);
  const { apiData } = props;

  let chart: Chart<
    "line",
    {
      y: number;
      x: string;
    }[],
    unknown
  >;

  const setDatasets = (filter: Filters) => {
    return [
      {
        label: Wallets.OVER_1K,
        data: apiData[filter][Wallets.OVER_1K],
        fill: false,
      },
      {
        label: Wallets.OVER_10K,
        data: apiData[filter][Wallets.OVER_10K],
        fill: false,
      },
      {
        label: Wallets.OVER_100K,
        data: apiData[filter][Wallets.OVER_100K],
        fill: false,
      },
      {
        label: Wallets.OVER_1M,
        data: apiData[filter][Wallets.OVER_1M],
        fill: false,
      },
      {
        label: Wallets.OVER_10M,
        data: apiData[filter][Wallets.OVER_10M],
        fill: false,
      },
    ];
  };

  const updateChart = (
    chart: Chart<
      "line",
      {
        y: number;
        x: string;
      }[],
      unknown
    >,
    filter: Filters,
    unit: "month" | "day" | "year"
  ) => {
    chart.data.datasets = setDatasets(filter);
    chart.options.scales!.x = {
      type: "time" as const,
      time: {
        unit,
      },
      title: {
        display: true,
        text: "Date",
      },
    };
    chart.options.plugins!.title = {
      text:
        filter !== Filters.All
          ? `BTC Address Balances over Time ${filter}`
          : "BTC Address Balances over Time",
      display: true,
    };
    if (filter === Filters.All) {
      chart.options.elements!.point = {
        radius: 0,
        borderWidth: 0,
        hoverRadius: 3,
        hoverBorderWidth: 3,
      };
    }
    chart.update("none");
  };

  useEffect(() => {
    if (
      chartRef &&
      chartRef.current &&
      apiData["All"] &&
      apiData["YTD"] &&
      apiData["12M"] &&
      apiData["6M"] &&
      apiData["3M"] &&
      apiData["1M"]
    ) {
      chart = new Chart(chartRef.current, {
        type: "line",
        data: { datasets: setDatasets(Filters.All) },
        options,
      });
    }
  }, [apiData]);

  return (
    <div>
      <canvas ref={chartRef} id="myChart"></canvas>
      <div className="flex flex-row-reverse gap-2">
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters["1M"], "day")}
        >
          {Filters["1M"]}
        </button>
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters["3M"], "day")}
        >
          {Filters["3M"]}
        </button>
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters["6M"], "day")}
        >
          {Filters["6M"]}
        </button>
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters["12M"], "month")}
        >
          {Filters["12M"]}
        </button>
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters.YTD, "day")}
        >
          {Filters.YTD}
        </button>
        <button
          className="btn"
          onClick={() => updateChart(chart, Filters.All, "year")}
        >
          {Filters.All}
        </button>
      </div>
    </div>
  );
};

export default LineChart;
