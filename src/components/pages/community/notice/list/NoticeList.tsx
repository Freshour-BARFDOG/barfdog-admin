'use client';
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import CommunityList from "@/components/pages/community/common/CommunityList";
import usePaginationQuery from "@/hooks/usePaginationQuery";
import { PAGE_SIZE, STATUS } from "@/constants/common";
import { CommunityListData } from "@/types/community";
import { Page } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { useGetCommunityList } from "@/api/community/queries/useGetCommunityList";
import { useDeleteCommunity } from "@/api/community/mutations/useDeleteCommunity";

export default function NoticeList() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		page,
		onChangePage,
	} = usePaginationQuery();
	const { data } = useGetCommunityList({
		type: 'notices',
		key: 'queryBlogsAdminDtoList',
		page,
		size: PAGE_SIZE.COMMON,
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_NOTICE_LIST,
			page,
		],
	})
	const { mutate } = useDeleteCommunity();

	const { addToast } = useToastStore();

	return (
		<CommunityList
			title='공지사항'
			data={data?.list as CommunityListData[]}
			page={page}
			onChangePage={onChangePage}
			pageData={data?.page as Page}
			columns={[
				{ key: 'title', header: '제목' },
				{ key: 'createdDate', header: '작성일', render: (row: CommunityListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
				{ key: 'status', header: '노출 여부', render: (row: CommunityListData) => STATUS[row.status] },
			]}
			createHref='/community/notice/create'
			onEditClick={(row) => router.push(`/community/notice/${row.id}`)}
			onDelete={async (id) => {
				mutate({
					type: 'notices',
					id,
				}, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_NOTICE_LIST, page],
						});
						addToast('공지사항 삭제가 완료되었습니다!');
					},
					onError: (error) => {
						console.log(error)
						addToast('공지사항 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
					}
				})
			}}
		/>
	);
}