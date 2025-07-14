'use client';
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import PromotionForm from "@/components/pages/benefits/promotions/form/PromotionForm";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { PromotionFormValues } from "@/types/benefits/promotions";
import { PROMOTION_LIST_INITIAL_SEARCH_VALUES } from "@/constants/benefits/promotions";
import { useCreatePromotion } from "@/api/promotions/mutations/useCreatePromotion";

export default function CreatePromotion() {
	const router = useRouter();

	const queryClient = useQueryClient();
	const { mutate } = useCreatePromotion();
	const { addToast } = useToastStore();

	const onSubmit = (data: PromotionFormValues) => {
		const requestBody = {
			...data,
			startDate: format(new Date(data.startDate), 'yyyy-MM-dd HH:mm:ss'),
			expiredDate: format(new Date(data.expiredDate), 'yyyy-MM-dd HH:mm:ss'),
		}

		mutate({
			body: requestBody,
		}, {
			onSuccess: async () => {
				addToast('프로모션 등록이 완료되었습니다!');
				// 프로모션 목록
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_LIST, 0, PROMOTION_LIST_INITIAL_SEARCH_VALUES],
				});

			},
			onError: (error) => {
				console.log(error);
				addToast('프로모션 등록에 실패했습니다.\n관리자에게의 문의해주세요.')
			}
		})
	};
	return (
		<PromotionForm onSubmit={onSubmit} onClose={() => router.push('/promotion')} />
	);
}