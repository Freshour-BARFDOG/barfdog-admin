import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { createCommunity } from "../community";
import { CommunityType } from "@/types/community";

export function useCreateCommunity<T extends object>(
  type: CommunityType,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: async ({ body }: { body: T }) =>
      await createCommunity(type, body),
    ...mutationOptions,
  });
}