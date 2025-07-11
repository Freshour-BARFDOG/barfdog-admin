'use client';
import { useMemo } from "react";
import { commonWrapper } from "@/styles/common.css";
import PromotionInfo from "@/components/pages/benefits/promotions/detail/info/PromotionInfo";
import PromotionMemberTable from "@/components/pages/benefits/promotions/detail/table/PromotionMemberTable";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import useModal from "@/hooks/useModal";
import UpdatePromotionModal from "@/components/pages/benefits/promotions/detail/modal/UpdatePromotionModal";
import { useGetPromotionDetail } from "@/api/promotions/queries/useGetPromotionDetail";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";

interface PromotionDetailProps {
	promotionId: number;
}

export default function PromotionDetail({
	promotionId,
}: PromotionDetailProps) {
	const { data } = useGetPromotionDetail(promotionId);
	const { isOpen, onClose, onToggle } = useModal();

	const defaultUpdateFormValue = useMemo(() => {
		return {
			promotionType: data.promotionType,
			name: data.name,
			startDate: data.startDate,
			expiredDate: data.expiredDate,
			couponId: data.couponId,
			quantity: data.quantity,
			status: data.status,
		}
	}, [data])

	const couponDetail = useMemo(() => {
		return {
			couponFullName: `[할인: ${data.discountDegree}${DISCOUNT_UNIT_TYPE[data.discountType]}] ${data.couponName}`,
			remaining: data.remaining,
			quantity: data.quantity,
		}
	}, [data]);
	
	return (
		<>
			<section className={commonWrapper({ direction: 'col', gap: 20 })}>
				<article className={commonWrapper({ justify: 'between', align: 'center' })}>
					<Text type='title2'>프로모션 상세</Text>
					<Button onClick={onToggle}>수정</Button>
				</article>
				<PromotionInfo data={data} />
				<PromotionMemberTable
					promotionId={promotionId}
					usedCount={data.usedCount}
					remaining={data.remaining}
					quantity={data.quantity}
				/>
			</section>
			{isOpen &&
				<UpdatePromotionModal
          promotionId={promotionId}
					isOpen={isOpen}
          onClose={onClose}
          couponDetail={couponDetail}
          defaultUpdateFormValue={defaultUpdateFormValue}
				/>
			}
		</>
	);
}