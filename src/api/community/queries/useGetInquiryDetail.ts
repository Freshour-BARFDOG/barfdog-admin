import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { InquiryDetailData } from "@/types/community";
import { getInquiryDetailWithAnswers } from "@/api/community/community";

export function useGetInquiryDetail(
	inquiryId: number,
	queryOptions?: UseQueryCustomOptions<InquiryDetailData>,
) {
	return useQuery<InquiryDetailData>({
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_INQUIRY_DETAIL,
			inquiryId,
		],
		queryFn: () => getInquiryDetailWithAnswers(inquiryId),
		keepPreviousData: true,
		...queryOptions,
	});
}