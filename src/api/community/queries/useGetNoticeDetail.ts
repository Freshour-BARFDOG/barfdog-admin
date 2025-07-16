import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { NoticeDetailResponse } from "@/types/community";
import { getNoticeDetail } from "@/api/community/community";

export function useGetNoticeDetail(
	noticeId: number,
	queryOptions?: UseQueryCustomOptions<NoticeDetailResponse>,
) {
	return useQuery<NoticeDetailResponse>({
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_NOTICE_DETAIL,
			noticeId,
		],
		queryFn: () => getNoticeDetail(noticeId),
		keepPreviousData: true,
		...queryOptions,
	});
}