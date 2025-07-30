import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import { deleteAllianceCouponList } from "@/api/alliance/alliance";

export function useDeleteAllianceCouponList(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: ({ couponBundleList }: {
			couponBundleList: string[],
		}) => deleteAllianceCouponList(couponBundleList),
		...mutationOptions,
	})
}
