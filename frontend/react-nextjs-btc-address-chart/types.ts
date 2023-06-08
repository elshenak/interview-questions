export type FormattedData = {
  [Wallets.OVER_1K]: { y: number; x: string }[];
  [Wallets.OVER_10K]: { y: number; x: string }[];
  [Wallets.OVER_100K]: { y: number; x: string }[];
  [Wallets.OVER_1M]: { y: number; x: string }[];
  [Wallets.OVER_10M]: { y: number; x: string }[];
};

export type APIData = {
  [Filters.All]: FormattedData;
  [Filters.YTD]: FormattedData;
  ["12M"]: FormattedData;
  ["6M"]: FormattedData;
  ["3M"]: FormattedData;
  ["1M"]: FormattedData;
};

export enum Wallets {
  OVER_1K = "≥ $1K",
  OVER_10K = "≥ $10K",
  OVER_100K = "≥ $100K",
  OVER_1M = "≥ $1M",
  OVER_10M = "≥ $10M",
}

export enum DataHeaders {
  OVER_1K = "BTC / Addr Cnt of Bal ≥ $1K",
  VALUE_OVER_10K = "BTC / Val in Addrs w/ Bal ≥ $10K USD",
  VALUE_OVER_100K = "BTC / Val in Addrs w/ Bal ≥ $100K USD",
  VALUE_OVER_1M = "BTC / Val in Addrs w/ Bal ≥ $1M USD",
  VALUE_OVER_10M = "BTC / Val in Addrs w/ Bal ≥ $10M USD",
}

export type DataRaw = {
  Time: string;
  [DataHeaders.OVER_1K]: number;
  [DataHeaders.VALUE_OVER_10K]: number;
  [DataHeaders.VALUE_OVER_100K]: number;
  [DataHeaders.VALUE_OVER_1M]: number;
  [DataHeaders.VALUE_OVER_10M]: number;
};

export enum Filters {
  All = "All",
  YTD = "YTD",
  "12M" = "12M",
  "6M" = "6M",
  "3M" = "3M",
  "1M" = "1M",
}
