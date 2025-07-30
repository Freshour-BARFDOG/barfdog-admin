import { format } from "date-fns";
import CommonBarChart from "@/components/pages/dashboard/common/chart/barChart/CommonBarChart";
import StatListLayout from "@/components/pages/dashboard/common/statList/StatListLayout";
import StatLabel from "@/components/pages/dashboard/common/statList/StatLabel";
import StatTooltip from "@/components/pages/dashboard/common/statList/StatTooltip";
import DividerVertical from "@/components/common/dividerVertical/DividerVertical";
import StatTopInfo from "@/components/pages/dashboard/common/statList/StatTopInfo";
import { MemberCountByDate } from "@/types/dashboard";
import { BAR_CHART_COLOR, MEMBER_COUNT_LABEL } from "@/constants/dashboard";

interface MemberCountStatProps {
	memberCountList: MemberCountByDate[];
	lastLoginCount: number;
	totalMemberCount: number;
	totalSubscriberCount: number;
}

export default function MemberCountStat({
	memberCountList,
	lastLoginCount,
	totalMemberCount,
	totalSubscriberCount,
}: MemberCountStatProps) {
	const memberCountByDateList = memberCountList.map(item => ({
		...item,
		name: format(new Date(item.date), 'yyyy-MM-dd'),
	}))
	const customOrder = ['newMemberCount'];

	return (
		<StatListLayout title={<StatTooltip title='회원' />}>
			<StatTopInfo
				leftChildren={(
					<>
					<StatLabel label='전체 회원 수' value={totalMemberCount} unit='명' />
					<DividerVertical thickness={1} color='gray200' />
					<StatLabel label='전체 구독자 수' value={totalSubscriberCount} unit='명' />
					</>
				)}
				rightChildren={(
					<StatLabel label='기간 내 로그인한 회원 수' value={lastLoginCount} unit='명' />
				)}
			/>
			<CommonBarChart
				data={memberCountByDateList}
				dataKeyX='name'
				bars={[
					{
						dataKey: 'newMemberCount',
						name: MEMBER_COUNT_LABEL.newMemberCount,
						color: BAR_CHART_COLOR.first,
					},
				]}
				labelMap={MEMBER_COUNT_LABEL}
				customOrder={customOrder as ("newMemberCount" | "name" | "date")[]}
				unit='명'
				showBrush
			/>
		</StatListLayout>
	);
}