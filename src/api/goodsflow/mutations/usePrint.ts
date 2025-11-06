import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { goodsFlowPrint } from "../goodsflow";

export function useGoodsFlowPrint(
  options?: Omit<
    UseMutationOptions<string, Error, { otp: string; id?: string }, unknown>,
    "mutationFn"
  >
) {
  return useMutation<string, Error, { otp: string; id?: string }>({
    mutationFn: goodsFlowPrint,
    ...options,
  });
}
