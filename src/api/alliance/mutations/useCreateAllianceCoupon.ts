import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { UseMutationCustomOptions } from "@/types/common";
import {
	createAllianceCoupon,
	excelDownloadCreateAllianceCoupon
} from "@/api/alliance/alliance";
import { AllianceCouponFormValues } from "@/types/alliance";

export function useCreateAllianceCoupon(mutationOptions?: UseMutationCustomOptions) {
	return useMutation({
		mutationFn: async (body: AllianceCouponFormValues) => {
			const data = await createAllianceCoupon(body);
			const couponBundle = data?.allianceCouponBundle;

			if (!couponBundle) {
				throw new Error('쿠폰 생성은 되었으나 bundle 값이 없습니다.')
			}

			const formatDateForRequestBody = (dateStr: string) => format(new Date(dateStr), 'yyyy-MM-dd');

			const excelDownloadBody = {
				bundle: couponBundle,
				useStartDate: formatDateForRequestBody(body.useStartDate),
				useExpiredDate: formatDateForRequestBody(body.useExpiredDate),
				couponPublishCount: Number(body.createCouponCount),
			}

			const blob = await excelDownloadCreateAllianceCoupon(excelDownloadBody);

			return {
				blob,
				bundle: couponBundle,
				useStartDate: excelDownloadBody.useStartDate,
				useExpiredDate: excelDownloadBody.useExpiredDate,
				couponPublishCount: excelDownloadBody.couponPublishCount,
			}
		},
		...mutationOptions,
	})
}
