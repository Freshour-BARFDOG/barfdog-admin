import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { NoticeDetailResponse } from "@/types/community";
import { getNoticeDetail } from "@/api/community/community";

export async function prefetchGetNoticeDetail(noticeId: number, queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<NoticeDetailResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_NOTICE_DETAIL, noticeId],
		queryFn: () => getNoticeDetail(noticeId, ssrAxios),
	})
}