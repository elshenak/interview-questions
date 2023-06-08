import csv from "csvtojson";
import * as path from "path";
import {
  DataRaw,
  DataHeaders,
  Wallets,
  FormattedData,
  Filters,
  APIData,
} from "../types";

export const parseBTC = async (fileName: string) => {
  const csvFilePath = path.resolve(__dirname, fileName);
  return await csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      return jsonObj;
    });
};

export const formatAPIDataResponse = (data: DataRaw[]): APIData => {
  return {
    All: formatData(data),
    YTD: formatData(filterRawData(data, Filters.YTD)),
    [Filters["12M"]]: formatData(filterRawData(data, Filters["12M"])),
    [Filters["6M"]]: formatData(filterRawData(data, Filters["6M"])),
    [Filters["3M"]]: formatData(filterRawData(data, Filters["3M"])),
    [Filters["1M"]]: formatData(filterRawData(data, Filters["1M"])),
  };
};

export const formatData = (data: DataRaw[]): FormattedData => {
  const OVER_1K: { y: number; x: string }[] = [];
  const OVER_10K: { y: number; x: string }[] = [];
  const OVER_100K: { y: number; x: string }[] = [];
  const OVER_1M: { y: number; x: string }[] = [];
  const OVER_10M: { y: number; x: string }[] = [];

  data.forEach((d) => {
    const total =
      +d[DataHeaders.VALUE_OVER_10K] +
      +d[DataHeaders.VALUE_OVER_100K] +
      +d[DataHeaders.VALUE_OVER_1M] +
      +d[DataHeaders.VALUE_OVER_10M];

    const x = d.Time;
    OVER_1K.push({ y: +d[DataHeaders.OVER_1K], x });
    OVER_10K.push({
      y:
        Math.round(
          +d[DataHeaders.OVER_1K] * (+d[DataHeaders.VALUE_OVER_10K] / total)
        ) || 0,
      x,
    });

    OVER_100K.push({
      y:
        Math.round(
          +d[DataHeaders.OVER_1K] * (+d[DataHeaders.VALUE_OVER_100K] / total)
        ) || 0,
      x,
    });

    OVER_1M.push({
      y:
        Math.round(
          +d[DataHeaders.OVER_1K] * (+d[DataHeaders.VALUE_OVER_1M] / total)
        ) || 0,
      x,
    });

    OVER_10M.push({
      y:
        Math.round(
          +d[DataHeaders.OVER_1K] * (+d[DataHeaders.VALUE_OVER_10M] / total)
        ) || 0,
      x,
    });
  });

  return {
    [Wallets.OVER_1K]: OVER_1K,
    [Wallets.OVER_10K]: OVER_10K,
    [Wallets.OVER_100K]: OVER_100K,
    [Wallets.OVER_1M]: OVER_1M,
    [Wallets.OVER_10M]: OVER_10M,
  };
};

export const filterRawData = (data: DataRaw[], filter: Filters): DataRaw[] => {
  let date = new Date(data[data.length - 1].Time);
  if (filter === Filters["12M"]) {
    date.setFullYear(date.getFullYear() - 1);
  } else if (filter === Filters["6M"]) {
    date.setMonth(date.getMonth() - 6);
  } else if (filter === Filters["3M"]) {
    date.setMonth(date.getMonth() - 3);
  } else if (filter === Filters["1M"]) {
    date.setMonth(date.getMonth() - 1);
  } else if (filter === Filters.YTD) {
    date = new Date(date.getFullYear(), 0, 1);
  }
  return data.filter(({ Time }) => new Date(Time) >= date);
};
