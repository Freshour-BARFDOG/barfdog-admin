import {
  GoodsFlowOrderRegisterRequest,
  GoodsFlowOrderRegisterResponse,
} from "@/types/sales/orders";
import axios from "axios";

const getGoodsFlowOtp = async () => {
  const { data } = await axios.post("/api/goodsflow/getOtp");
  return data.data;
};

const getContractList = async (otp: string): Promise<string> => {
  const { data } = await axios.post("/api/goodsflow/contractList", { otp });
  return data;
};

const registerGoodsFlowOrder = async (
  body: GoodsFlowOrderRegisterRequest
): Promise<GoodsFlowOrderRegisterResponse> => {
  const { data } = await axios.post<GoodsFlowOrderRegisterResponse>(
    "/api/goodsflow/orderRegister",
    { data: body }
  );
  return data;
};

const goodsFlowPrint = async (params: { otp: string; id?: string }) => {
  const { data } = await axios.post("/api/goodsflow/print", params);
  return data;
};

const cancelGoodsFlowOrder = async (transUniqueCd: string) => {
  const { data } = await axios.post("/api/goodsflow/cancelOrder", {
    transUniqueCd,
  });
  return data;
};

export {
  getGoodsFlowOtp,
  getContractList,
  registerGoodsFlowOrder,
  goodsFlowPrint,
  cancelGoodsFlowOrder,
};
