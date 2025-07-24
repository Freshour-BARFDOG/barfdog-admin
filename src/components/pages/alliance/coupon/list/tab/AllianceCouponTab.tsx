import * as styles from './AllianceCouponTab.css';
import Text from "@/components/common/text/Text";
import { ALLIANCE_COUPON_STATUS } from "@/constants/alliance";
import { AllianceCouponStatus } from "@/types/alliance";

interface AllianceCouponTabProps {
	status: AllianceCouponStatus;
	onChangeStatus: (status: AllianceCouponStatus) => void;
}

export default function AllianceCouponTab({
	status,
	onChangeStatus,
}: AllianceCouponTabProps) {

	const statusList = [
		{
			label: ALLIANCE_COUPON_STATUS.ACTIVE,
			value: 'ACTIVE'
		},
		{
			label: ALLIANCE_COUPON_STATUS.INACTIVE,
			value: 'INACTIVE'
		},
	]

	return (
		<div>
			{statusList.map(item => {
				const isActive = item.value === status;
				return (
					<button
						key={item.value}
						onClick={() => onChangeStatus(item.value as AllianceCouponStatus)}
						className={styles.allianceCouponListTab({ active: isActive })}
					>
						<Text
							type='label3'
							color={isActive ? 'red' : 'gray600'}
						>
							{item.label} 쿠폰
						</Text>
					</button>
				)
			})}
		</div>
	);
}