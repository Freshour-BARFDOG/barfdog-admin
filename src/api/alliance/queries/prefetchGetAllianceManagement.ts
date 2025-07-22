import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { AllianceManagementResponse } from "@/types/alliance";
import { getAllianceManagement } from "@/api/alliance/alliance";
import { INITIAL_MANAGEMENT_SEARCH_VALUES } from "@/constants/alliance";

export async function prefetchGetAllianceManagement(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<AllianceManagementResponse>({
		queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_MANAGEMENT, 0, INITIAL_MANAGEMENT_SEARCH_VALUES],
		queryFn: () => getAllianceManagement(0, INITIAL_MANAGEMENT_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}