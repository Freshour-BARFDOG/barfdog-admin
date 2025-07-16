'use client';
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { CreateNoticeFormValues, NoticeFormValues } from "@/types/community";
import { useCreateNotice } from "@/api/community/mutations/useCreateNotice";
import NoticeForm from "@/components/pages/community/notice/form/NoticeForm";

export default function CreateNotice() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useCreateNotice();
	const { addToast } = useToastStore();

	const onSubmit = (data: NoticeFormValues) => {
		const body = {
			status: data.status,
			title: data.title,
			contents: data.contents,
			noticeImageIdList: data.addImageIdList,
		}
		mutate({
			body: body as CreateNoticeFormValues,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_NOTICE_LIST,
						0
					],
				});
				addToast('등록이 완료되었습니다!');
				router.push('/community/notice');
			},
			onError: (error) => {
				console.log(error)
				addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<NoticeForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				title: '',
				status: 'LEAKED',
				contents: '',
				addImageIdList: [],
				deleteImageIdList: [],
			}}
		/>
	);
}