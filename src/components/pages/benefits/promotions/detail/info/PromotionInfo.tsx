import { format } from "date-fns";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import DetailTable from "@/components/common/detailTable/DetailTable";
import { PROMOTION_STATUS } from "@/constants/benefits/promotions";
import { DISCOUNT_UNIT_TYPE } from "@/constants/common";
import { COUPON_TARGET } from "@/constants/benefits/coupons";
import { commonWrapper } from "@/styles/common.css";
import { PromotionDetailData } from "@/types/benefits/promotions";

interface PromotionInfoProps {
	data: PromotionDetailData;
}

export default function PromotionInfo({ data }: PromotionInfoProps) {

	const defaultInfoList = [
		{ label: '이름', value: data.name },
		{
			label: '상태',
			value: (
				<Text 
					type='label3' 
					color={
						data.status === 'ACTIVE' 
							? 'pastelRed' 
							: data.status === 'INACTIVE' 
								? 'gray600' 
								: 'gray900'
						}
					>
						{PROMOTION_STATUS[data.status]}
						</Text>
			)
		},
		{
			label: '기간',
			value: (
				<Text type='body3'>
					{format(new Date(data.startDate), 'yyyy-MM-dd HH:mm:ss')}<br/>
					~ {format(new Date(data.expiredDate), 'yyyy-MM-dd HH:mm:ss')}
				</Text>
			)
		},
		{
			label: '타입',
			value: data.promotionType
		},
	];

	const couponInfoList = [
		{ label: '이름', value: data.couponName },
		{ label: '설명', value: data.description },
		{ label: '코드', value: data.code },
		{ label: '사용 가능 횟수', value: `${data.amount.toLocaleString()}회` },
		{ label: '할인', value: `${data.discountDegree.toLocaleString()}${DISCOUNT_UNIT_TYPE[data.discountType]}` },
		{ label: '사용처', value: COUPON_TARGET[data.couponTarget] },
		{ label: '최소 사용 금액', value: `${data.availableMinPrice.toLocaleString()}원` },
		{ label: '최대 할인 금액', value: `${data.availableMaxDiscount.toLocaleString()}원` },
	]
	console.log('promotionInfo', data)
	return (
		<Card shadow='none' padding={20}>
			<div className={commonWrapper({ direction: 'col', gap: 20 })}>
				<DetailTable items={defaultInfoList} title='프로모션 정보' columns={2} />
				<DetailTable items={couponInfoList} title='쿠폰 정보' columns={2} />
			</div>
		</Card>
	);
}