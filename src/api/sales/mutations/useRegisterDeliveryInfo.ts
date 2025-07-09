import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { registerDeliveryInfo } from "../sales";

export function useRegisterDeliveryInfo(
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: registerDeliveryInfo,
    ...mutationOptions,
  });
}
