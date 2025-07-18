import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { updateCommunity } from "../community";
import { CommunityType } from "@/types/community";

export function useUpdateCommunity<T extends object>(
  type: CommunityType,
  mutationOptions?: UseMutationCustomOptions
) {
  return useMutation({
    mutationFn: async ({ id, body }: { id: number, body: T }) =>
      await updateCommunity(type, body, id),
    ...mutationOptions,
  });
}