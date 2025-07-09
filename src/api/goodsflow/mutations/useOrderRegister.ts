import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { getContractList, registerGoodsFlowOrder } from "../goodsflow";
import {
  GoodsFlowOrderRegisterRequest,
  GoodsFlowResponse,
} from "@/types/sales/orders";

export function useGoodsFlowOrderRegister(
  mutationOptions?: UseMutationCustomOptions<GoodsFlowResponse>
) {
  return useMutation({
    mutationFn: (body: GoodsFlowOrderRegisterRequest) =>
      registerGoodsFlowOrder(body),
    ...mutationOptions,
  });
}
