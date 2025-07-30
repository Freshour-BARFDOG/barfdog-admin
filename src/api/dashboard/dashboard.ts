import { AxiosInstance } from "axios";
import axiosInstance from "@/api/axiosInstance";
import { cleanQueryParams } from "@/utils/cleanQueryParams";
import { STATS_INITIAL_SEARCH_VALUES } from "@/constants/dashboard";
import { StatsDataResponse, StatsSearchParams } from "@/types/dashboard";

const getStatsData = async (
	searchParams: StatsSearchParams = STATS_INITIAL_SEARCH_VALUES,
	instance: AxiosInstance = axiosInstance,
): Promise<StatsDataResponse> => {
	const filtered = cleanQueryParams(searchParams);

	const query = new URLSearchParams(filtered).toString();

	try {
		const { data } = await instance.get(`/api/admin/dashBoard/stats?${query}`, {
			timeout: 50000
		});
		return {
			from: data.from,
			to: data.to,
			totalOrderCount: data.totalOrderCount,
			totalSales: data.totalSales,
			deliveryStatusList: data.deliveryStatusStatsDtoList,
			generalOrder: {
				generalOrderStatusList: data.generalOrderStatsDto.generalOrderStatusStatsDtoList,
				newGeneralOrderCount: data.generalOrderStatsDto.newGeneralOrderCount,
				totalGeneralOrderSales: data.generalOrderStatsDto.totalGeneralOrderSales,
			},
			graph: {
				memberCountByDateList: data.graphDto.memberCountByDateDtoList,
				orderCountByDateList: data.graphDto.orderCountByDateDtoList,
				salesCountByDateList: data.graphDto.salesCountByDateDtoList,
				lastLoginCount: data.graphDto.lastLoginCount,
				totalMemberCount: data.graphDto.totalMemberCount,
			},
			orderStatusList: data.orderStatusStatsDtoList,
			question: data.questionStatsDto,
			salesByRecipeList: data.salesByRecipeDtoList,
			subscription: {
				subscribeCancelReasonList: data.subscribeStatsDto.subscribeCancelReasonDtoList,
				subscribeStatusList: data.subscribeStatsDto.subscribeStatusStatsDtoList,
				subscribeSumGramByRecipeList: data.subscribeStatsDto.subscribeSumGramByRecipeDtoList,
				subscriberByPlanList: data.subscribeStatsDto.subscriberByPlanDtoList,
				subscriberByRecipeList: data.subscribeStatsDto.subscriberByRecipeDtoList,
				avgPaymentPrice: data.subscribeStatsDto.avgPaymentPrice,
				newSubscribeCount: data.subscribeStatsDto.newSubscribeCount,
				subscribeCancelCount: data.subscribeStatsDto.subscribeCancelCount,
				totalSubscribeCount: data.subscribeStatsDto.totalSubscribeCount,
				totalSubscribeSales: data.subscribeStatsDto.totalSubscribeSales,
				totalSubscriberCount: data.subscribeStatsDto.totalSubscriberCount,
			},
		};
	} catch (error) {
		throw error;
	}
};

export {
	getStatsData,
}