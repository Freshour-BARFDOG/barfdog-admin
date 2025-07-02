import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { getContractList, registerGoodsFlowOrder } from "../goodsflow";
import {
  GoodsFlowOrderRegisterRequest,
  GoodsFlowOrderRegisterResponse,
} from "@/types/sales/orders";

export function useGoodsFlowOrderRegister(
  mutationOptions?: UseMutationCustomOptions<GoodsFlowOrderRegisterResponse>
) {
  return useMutation({
    mutationFn: (body: GoodsFlowOrderRegisterRequest) =>
      registerGoodsFlowOrder(body),
    ...mutationOptions,
  });
}
