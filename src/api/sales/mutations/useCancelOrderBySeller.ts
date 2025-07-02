import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { cancelOrderBySeller } from "../sales";

export function useCancelOrderBySeller(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: cancelOrderBySeller,
    ...mutationOptions,
  });
}
