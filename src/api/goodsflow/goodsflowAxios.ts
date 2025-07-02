import axios from "axios";

const commonConfig = {
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "goodsFLOW-Api-Key": process.env.NEXT_PUBLIC_GOODSFLOW_API_KEY!,
  },
};

export const goodsflowAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOODSFLOW_API_URL,
  ...commonConfig,
});

export const goodsflowPrintAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOODSFLOW_PRINT_URL,
  ...commonConfig,
});
