import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { InquiryListResponse, InquiryListSearchParams } from "@/types/community";
import { getInquiryList } from "@/api/community/community";

export function useGetInquiryList(
	page: number,
	searchParams: InquiryListSearchParams,
	queryOptions?: UseQueryCustomOptions<InquiryListResponse>,
) {
	return useQuery<InquiryListResponse>({
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_INQUIRY_LIST,
			page,
			searchParams,
		],
		queryFn: () => getInquiryList(page, searchParams),
		keepPreviousData: true,
		...queryOptions,
	});
}