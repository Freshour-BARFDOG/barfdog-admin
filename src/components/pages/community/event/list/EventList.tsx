'use client';
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import CommunityList from "@/components/pages/community/common/CommunityList";
import usePaginationQuery from "@/hooks/usePaginationQuery";
import { PAGE_SIZE, STATUS } from "@/constants/common";
import { EventListData } from "@/types/community";
import { Page } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { useGetCommunityList } from "@/api/community/queries/useGetCommunityList";
import { useDeleteCommunity } from "@/api/community/mutations/useDeleteCommunity";
import Image from "next/image";

export default function EventList() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		page,
		onChangePage,
	} = usePaginationQuery();
	const { data } = useGetCommunityList({
		type: 'events',
		key: 'queryEventsAdminDtoList',
		page,
		size: PAGE_SIZE.COMMON,
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_EVENT_LIST,
			page,
		],
	})
	const eventList = data?.list.map((item) => ({ imageUrl: item.imageUrl, ...item.eventsAdminDto }))
	const { mutate } = useDeleteCommunity();

	const { addToast } = useToastStore();

	if(!data) return null;

	return (
		<CommunityList
			title='이벤트'
			data={eventList as EventListData[]}
			page={page}
			onChangePage={onChangePage}
			pageData={data?.page as Page}
			columns={[
				{ key: 'title', header: '제목' },
				{
					key: 'imageUrl',
					header: '이미지',
					width: 100,
					render: (row: EventListData) => (
						<Image src={row.imageUrl} alt={row.title} width={80} height={80} style={{ objectFit: 'contain' }} />
					)
				},
				{ key: 'createdDate', header: '작성일', render: (row: EventListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
				{ key: 'status', header: '노출 여부', render: (row: EventListData) => STATUS[row.status] },
			]}
			createHref='/community/event/create'
			onEditClick={(row) => router.push(`/community/event/${row.id}`)}
			onDelete={async (id) => {
				mutate({
					type: 'events',
					id,
				}, {
					onSuccess: async () => {
						await queryClient.invalidateQueries({
							queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_EVENT_LIST, page],
						});
						addToast('이벤트 삭제가 완료되었습니다!');
					},
					onError: (error) => {
						console.log(error)
						addToast('이벤트 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
					}
				})
			}}
		/>
	);
}