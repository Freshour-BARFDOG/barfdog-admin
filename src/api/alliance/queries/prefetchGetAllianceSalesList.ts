import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";
import { AllianceMemberSalesData } from "@/types/alliance";
import { getAllianceSalesList } from "@/api/alliance/alliance";

export async function prefetchGetAllianceSalesList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<AllianceMemberSalesData[]>({
		queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_SALES_LIST, INITIAL_SEARCH_VALUES],
		queryFn: () => getAllianceSalesList(INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}