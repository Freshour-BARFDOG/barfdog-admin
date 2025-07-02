import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { cancelGoodsFlowOrder } from "../goodsflow";

export function useGoodsFlowCancelOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (transUniqueCd: string) => cancelGoodsFlowOrder(transUniqueCd),
    ...mutationOptions,
  });
}
