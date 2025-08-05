'use client';
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { StatusType } from "@/types/common";
import { EventDetailResponse, EventFormValues } from "@/types/community";
import { queryKeys } from "@/constants/queryKeys";
import { useGetCommunityDetail } from "@/api/community/queries/useGetCommunityDetail";
import { useUpdateCommunity } from "@/api/community/mutations/useUpdateCommunity";
import EventForm from "@/components/pages/community/event/form/EventForm";
import { AxiosError } from "axios";

interface EventDetailProps {
	eventId: number;
}

export default function EventDetail({ eventId }: EventDetailProps) {
	const queryClient = useQueryClient();

	const { data: eventDetailData } = useGetCommunityDetail<EventDetailResponse>('events', eventId);
	const { mutate } = useUpdateCommunity<EventFormValues>('events');

	const { addToast } = useToastStore();
	
	const onSubmit = (data: EventFormValues) => {
		// 삭제되는 값의 할당되는 조건은 다음 조건으로 나뉨
		// 1. 기존 이미지(eventImageList에 포함된 id)를 삭제한 경우 → deleteImageIdList 그대로 사용 (삭제된 id 저장)
		// 2. 업로드한 새 이미지를 삭제한 경우 → deleteImageIdList: [] (즉, 기존 이미지 삭제가 아니게 처리)

		const serverImageIds = eventDetailData?.eventImageList?.map(img => img.id) ?? [];

		const filteredDeleteImageIdList = data.deleteImageIdList.filter((id) =>
			serverImageIds.includes(id)
		);
		
		const body = {
			status: data.status,
			title: data.title,
			thumbnailId: data.thumbnailId,
			imageOrderDtoList: data.imageOrderDtoList,
			addImageIdList: data.addImageIdList,
			deleteImageIdList: filteredDeleteImageIdList,
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
				if(error instanceof AxiosError) {
					if(error.response?.status === 400) {
						addToast('수정시');	
					}
				}
				addToast('수정에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<EventForm
			onSubmit={onSubmit}
			eventId={eventId}
			defaultUpdateFormValue={{
				status: eventDetailData?.eventInfo.status ?? 'LEAKED' as StatusType,
				title: eventDetailData?.eventInfo.title ?? '',
				thumbnailId: eventDetailData?.eventInfo.thumbnailId ?? null,
				filename: eventDetailData?.eventInfo.filename ?? '',
				url: eventDetailData?.eventInfo.url ?? '',
				addImageIdList: [],
				deleteImageIdList: [],
				imageOrderDtoList: eventDetailData?.eventImageList ?? [],
			}}
		/>
	);
}