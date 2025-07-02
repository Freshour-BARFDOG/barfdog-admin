import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { confirmOrder } from "../sales";

export function useConfirmOrder(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: confirmOrder,
    ...mutationOptions,
  });
}
