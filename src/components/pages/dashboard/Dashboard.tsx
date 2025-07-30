'use client';
import { commonWrapper } from "@/styles/common.css";
import LabeledRadioButtonGroup from "@/components/common/labeledRadioButtonGroup/LabeledRadioButtonGroup";
import DateTimeRangeFilter from "@/components/common/dateTimeRangeFilter/DateTimeRangeFilter";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import TooltipInfo from "@/components/common/tooltip/TooltipInfo";
import Loader from "@/components/common/loader/Loader";
import DeliveryStat from "@/components/pages/dashboard/deliveryStat/DeliveryStat";
import GeneralOrderStat from "@/components/pages/dashboard/generalOrderStat/GeneralOrderStat";
import InquiryStat from "@/components/pages/dashboard/inquiryStat/InquiryStat";
import OrderStat from "@/components/pages/dashboard/orderStat/OrderStat";
import SubscriptionStat from "@/components/pages/dashboard/subscriptionStat/SubscriptionStat";
import OrderCountStat from "@/components/pages/dashboard/orderCountStat/OrderCountStat";
import MemberCountStat from "@/components/pages/dashboard/memberCountStat/MemberCountStat";
import SalesCountStat from "@/components/pages/dashboard/salesCountStat/SalesCountStat";
import useSearchValues from "@/hooks/useSearchValues";
import { SearchFilterItem } from "@/types/common";
import { GraphIntervalType, StatsSearchParams } from "@/types/dashboard";
import { GRAPH_INTERVAL_LIST, STATS_INITIAL_SEARCH_VALUES } from "@/constants/dashboard";
import { useGetStatsData } from "@/api/dashboard/queries/useGetStatsData";

export default function Dashboard() {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		onSubmit,
		onReset,
	} = useSearchValues<StatsSearchParams>(STATS_INITIAL_SEARCH_VALUES);

	const { data, isLoading } = useGetStatsData(submittedValues ?? STATS_INITIAL_SEARCH_VALUES);

	const filters: SearchFilterItem[] = [
		{
			label: (
				<TooltipInfo title='조회 기간'>
					좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.
				</TooltipInfo>
			),
			children: (
				<DateTimeRangeFilter
					formatType='yyyy-MM-dd-HH-mm'
					value={{
						startDateTime: searchValues.from,
						endDateTime: searchValues.to,
					}}
					onChangeRange={(value) => {
						const { startDateTime, endDateTime } = value;
						setSearchValues({
							...searchValues,
							from: startDateTime as string,
							to: endDateTime as string,
						})
					}}
				/>
			),
			align: 'start'
		},
		{
			label: '그래프 기준',
			children: (
				<LabeledRadioButtonGroup
					options={GRAPH_INTERVAL_LIST}
					value={searchValues.graphInterval}
					onChange={(value) =>
						setSearchValues({ ...searchValues, graphInterval: value as GraphIntervalType })
					}
				/>
			),
		},
	]

	return (
		<div className={commonWrapper({ direction: 'col', gap: 20 })}>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
				disabled={isLoading}
			/>
			{!data || isLoading
				? <Loader size={48} height={300} padding={20} />
				: (
					<div className={commonWrapper({ wrap: 'wrap', gap: 20, align: 'start' })}>
						<OrderStat
							totalOrderCount={data.totalOrderCount}
							totalSales={data.totalSales}
							orderStatusList={data.orderStatusList}
							salesByRecipeList={data.salesByRecipeList}
						/>
						<DeliveryStat data={data?.deliveryStatusList} />
						<GeneralOrderStat data={data?.generalOrder} />
						<InquiryStat data={data?.question} />
						<SubscriptionStat data={data?.subscription} />
						<MemberCountStat
							memberCountList={data?.graph?.memberCountByDateList}
							lastLoginCount={data?.graph?.lastLoginCount}
							totalMemberCount={data?.graph?.totalMemberCount}
							totalSubscriberCount={data?.subscription?.totalSubscriberCount}
						/>
						<OrderCountStat data={data?.graph?.orderCountByDateList} />
						<SalesCountStat
							salesCountList={data?.graph?.salesCountByDateList}
							totalSales={data?.totalSales}
							totalGeneralOrderSales={data?.generalOrder?.totalGeneralOrderSales}
							totalSubscribeSales={data?.subscription?.totalSubscribeSales}
						/>
					</div>
				)
			}
		</div>
	);
}