import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { UseQueryCustomOptions } from "@/types/common";
import { NoticeListResponse } from "@/types/community";
import { getCommunityList } from "@/api/community/community";
import { PAGE_SIZE } from "@/constants/common";

export function useGetNoticeList(
	page: number,
	queryOptions?: UseQueryCustomOptions<NoticeListResponse>,
) {
	return useQuery<NoticeListResponse>({
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_NOTICE_LIST,
			page,
		],
		queryFn: async () => await getCommunityList(
			'notices',
			'queryBlogsAdminDtoList',
			page,
			PAGE_SIZE.COMMUNITY.NOTICE
		),
		keepPreviousData: true,
		...queryOptions,
	});
}