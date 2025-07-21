import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { getInquiryDetailWithAnswers } from "@/api/community/community";

export async function prefetchInquiryDetail(
  inquiryId: number,
  queryClient: QueryClient
) {
  const ssrAxios = await createSSRRequest();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_INQUIRY_DETAIL, inquiryId],
    queryFn: () => getInquiryDetailWithAnswers(inquiryId, ssrAxios),
  });
}