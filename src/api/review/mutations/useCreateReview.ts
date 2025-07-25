import { UseMutationCustomOptions } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/api/review/review";
import { ReviewFormValues } from "@/types/review";

export function useCreateReview(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: ({ body }: { body: ReviewFormValues }) => createReview(body),
    ...mutationOptions,
  });
}