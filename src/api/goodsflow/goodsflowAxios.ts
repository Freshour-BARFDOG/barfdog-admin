import axios from "axios";

/**
 * GoodsFlow 전용 Axios 인스턴스
 * - baseURL, API Key 등을 한곳에 모아 관리
 */
const goodsflowAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOODSFLOW_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "goodsFLOW-Api-Key": process.env.NEXT_PUBLIC_GOODSFLOW_API_KEY || "",
  },
});

export default goodsflowAxios;
