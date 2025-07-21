import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { AxiosInstance } from "axios";
import { InquiryListResponse } from "@/types/community";
import { INQUIRY_LIST_INITIAL_SEARCH_VALUES } from "@/constants/community";
import { getInquiryList } from "@/api/community/community";

export async function prefetchGetInquiryList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<InquiryListResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_INQUIRY_LIST, 0, INQUIRY_LIST_INITIAL_SEARCH_VALUES],
		queryFn: () => getInquiryList(0, INQUIRY_LIST_INITIAL_SEARCH_VALUES, ssrAxios as AxiosInstance),
	})
}