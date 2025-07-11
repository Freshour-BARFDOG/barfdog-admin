import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import CloseButton from '/public/images/icons/close.svg';
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PromotionForm from "@/components/pages/benefits/promotions/form/PromotionForm";
import { PromotionCouponDetail, PromotionFormValues } from "@/types/benefits/promotions";
import { queryKeys } from "@/constants/queryKeys";
import {
	PROMOTION_LIST_INITIAL_SEARCH_VALUES,
	PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES
} from "@/constants/benefits/promotions";
import { useUpdatePromotion } from "@/api/promotions/mutations/useUpdatePromotion";
import { useToastStore } from "@/store/useToastStore";

interface UpdatePromotionModalProps {
	promotionId: number;
	isOpen: boolean;
	onClose: () => void;
	couponDetail: PromotionCouponDetail;
	defaultUpdateFormValue: PromotionFormValues;
}

export default function UpdatePromotionModal({
	promotionId,
	isOpen,
	onClose,
	couponDetail,
	defaultUpdateFormValue,
}: UpdatePromotionModalProps) {
	const queryClient = useQueryClient();
	const { mutate } = useUpdatePromotion();
	const { addToast } = useToastStore();

	const onSubmit = (data: PromotionFormValues) => {
		const requestBody = {
			...data,
			startDate: format(new Date(data.startDate), 'yyyy-MM-dd HH:mm:ss'),
			expiredDate: format(new Date(data.expiredDate), 'yyyy-MM-dd HH:mm:ss'),
		}
		mutate({
			promotionId: promotionId,
			body: requestBody,
		}, {
			onSuccess: async () => {
				addToast('프로모션 수정이 완료되었습니다!');
				// 프로모션 목록
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_LIST, 0, PROMOTION_LIST_INITIAL_SEARCH_VALUES],
				});
				// 프로모션 상세
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.PROMOTIONS.BASE, queryKeys.PROMOTIONS.GET_PROMOTION_DETAIL, promotionId],
				});
				// 프로모션 참여 회원 목록
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.PROMOTIONS.BASE,
						queryKeys.PROMOTIONS.GET_PROMOTION_MEMBER_LIST,
						promotionId,
						0,
						PROMOTION_MEMBER_LIST_INITIAL_SEARCH_VALUES,
					],
				});
				onClose();
			},
			onError: (error) => {
				console.log(error);
				addToast('프로모션 수정에 실패했습니다.\n관리자에게의 문의해주세요.')
			}
		})
	}
	return (
		<ModalBackground isVisible={isOpen} onClose={onClose} closeOnBackgroundClick={false}>
			<div className={commonWrapper({ width: 'half' })}>
				<Card shadow='none' padding={20} gap={16}>
					<div className={commonWrapper({ justify: 'between' })}>
						<Text type='title3'>프로모션 수정</Text>
						<button onClick={onClose}><SvgIcon src={CloseButton} /></button>
					</div>
					<PromotionForm
						onSubmit={onSubmit}
						onClose={onClose}
						backgroundColor='gray50'
						defaultUpdateFormValue={defaultUpdateFormValue}
						couponDetail={couponDetail}
					/>
				</Card>
			</div>
		</ModalBackground>
	);
}