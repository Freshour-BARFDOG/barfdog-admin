'use client';
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { CreateEventFormValues, EventFormValues } from "@/types/community";
import EventForm from "@/components/pages/community/event/form/EventForm";
import { useCreateCommunity } from "@/api/community/mutations/useCreateCommunity";

export default function CreateEvent() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useCreateCommunity<CreateEventFormValues>('events');
	const { addToast } = useToastStore();

	const onSubmit = (data: EventFormValues) => {
		const body = {
			status: data.status,
			title: data.title,
			thumbnailId: data.thumbnailId,
			eventImageRequestDtoList: data.imageOrderDtoList,
		}
		mutate({
			body: body as CreateEventFormValues,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_EVENT_LIST,
						0
					],
				});
				addToast('등록이 완료되었습니다!');
				router.push('/community/event');
			},
			onError: (error) => {
				console.log(error)
				addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<EventForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				title: '',
				status: 'LEAKED',
				thumbnailId: null,
				addImageIdList: [],
				deleteImageIdList: [],
				imageOrderDtoList: [],
			}}
		/>
	);
}