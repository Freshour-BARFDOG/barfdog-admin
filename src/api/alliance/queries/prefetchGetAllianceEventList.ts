import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { AllianceCouponSelectOption } from "@/types/alliance";
import { getAllianceEventList } from "@/api/alliance/alliance";

export async function prefetchGetAllianceEventList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<AllianceCouponSelectOption[]>({
		queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_EVENT_LIST],
		queryFn: () => getAllianceEventList(ssrAxios as AxiosInstance),
	})
}