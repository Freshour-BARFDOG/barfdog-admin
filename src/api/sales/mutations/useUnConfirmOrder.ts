import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { unConfirmOrder } from "../sales";

export function useUnConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: unConfirmOrder,
    ...mutationOptions,
  });
}
