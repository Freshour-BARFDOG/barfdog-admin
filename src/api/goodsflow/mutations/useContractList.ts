import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { getContractList } from "../goodsflow";

export function useGoodsFlowContractList(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: (otp: string) => getContractList(otp),
    ...mutationOptions,
  });
}
