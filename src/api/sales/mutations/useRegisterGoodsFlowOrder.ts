import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { registerGoodsFlowOrder } from "../sales";

export function useRegisterGoodsFlowOrder(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: registerGoodsFlowOrder,
    ...mutationOptions,
  });
}
