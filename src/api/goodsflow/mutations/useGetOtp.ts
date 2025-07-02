import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { getGoodsFlowOtp } from "../goodsflow";

export function useGoodsFlowOtp(
  options?: Omit<UseMutationOptions<string, Error, void, unknown>, "mutationFn">
) {
  return useMutation<string, Error, void>({
    mutationFn: getGoodsFlowOtp,
    ...options,
  });
}
