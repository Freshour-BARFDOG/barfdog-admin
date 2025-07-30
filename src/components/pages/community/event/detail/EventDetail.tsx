'use client';
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { StatusType } from "@/types/common";
import { EventDetailResponse, EventFormValues } from "@/types/community";
import { queryKeys } from "@/constants/queryKeys";
import { useGetCommunityDetail } from "@/api/community/queries/useGetCommunityDetail";
import { useUpdateCommunity } from "@/api/community/mutations/useUpdateCommunity";
import EventForm from "@/components/pages/community/event/form/EventForm";

interface EventDetailProps {
	eventId: number;
}

export default function EventDetail({ eventId }: EventDetailProps) {
	const queryClient = useQueryClient();

	const { data } = useGetCommunityDetail<EventDetailResponse>('events', eventId);
	const { mutate } = useUpdateCommunity<EventFormValues>('events');

	const { addToast } = useToastStore();

	const onSubmit = (data: EventFormValues) => {
		const body = {
			status: data.status,
			title: data.title,
			thumbnailId: data.thumbnailId,
			imageOrderDtoList: data.imageOrderDtoList,
			addImageIdList: data.addImageIdList,
			// deleteImageIdList: data.deleteImageIdList,
			deleteImageIdList: [],
		}
		mutate({
			body,
			id: eventId,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_EVENT_DETAIL,
						eventId,
					],
				});
				addToast('수정이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('수정에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<EventForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				status: data?.eventInfo.status ?? 'LEAKED' as StatusType,
				title: data?.eventInfo.title ?? '',
				thumbnailId: data?.eventInfo.thumbnailId ?? null,
				filename: data?.eventInfo.filename ?? '',
				url: data?.eventInfo.url ?? '',
				addImageIdList: [],
				deleteImageIdList: [],
				imageOrderDtoList: data?.eventImageList ?? [],
			}}
		/>
	);
}