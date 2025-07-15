import { QueryClient } from "@tanstack/react-query";
import { createSSRRequest } from "@/api/withAuthSSR";
import { queryKeys } from "@/constants/queryKeys";
import { NoticeListResponse } from "@/types/community";
import { getCommunityList } from "@/api/community/community";
import { PAGE_SIZE } from "@/constants/common";

export async function prefetchGetNoticeList(queryClient: QueryClient) {
	const ssrAxios = await createSSRRequest();
	await queryClient.prefetchQuery<NoticeListResponse>({
		queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_NOTICE_LIST, 0],
		queryFn: async () =>  await getCommunityList(
			'notices',
			'queryBlogsAdminDtoList',
			0,
			PAGE_SIZE.COMMUNITY.NOTICE,
			ssrAxios
		),
	})
}