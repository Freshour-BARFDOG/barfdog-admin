import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { updateSalesDelivery } from "../sales";

export function useUpdateSalesDelivery(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: updateSalesDelivery,
    ...mutationOptions,
  });
}
