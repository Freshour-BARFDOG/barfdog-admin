'use client';
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { StatusType } from "@/types/common";
import { NoticeFormValues } from "@/types/community";
import { queryKeys } from "@/constants/queryKeys";
import { useGetNoticeDetail } from "@/api/community/queries/useGetNoticeDetail";
import { useUpdateNotice } from "@/api/community/mutations/useUpdateNotice";
import NoticeForm from "@/components/pages/community/notice/form/NoticeForm";

interface NoticeDetailProps {
	noticeId: number;
}

export default function NoticeDetail({ noticeId }: NoticeDetailProps) {
	const queryClient = useQueryClient();

	const { data } = useGetNoticeDetail(noticeId);
	const { mutate } = useUpdateNotice();

	const { addToast } = useToastStore();

	const onSubmit = (data: NoticeFormValues) => {
		mutate({
			body: data,
			noticeId: noticeId,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_NOTICE_DETAIL,
						noticeId,
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
		<NoticeForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				id: data?.noticeInfo.id,
				status: data?.noticeInfo.status ?? 'LEAKED' as StatusType,
				title: data?.noticeInfo.title ?? '',
				contents: data?.noticeInfo.contents ?? '',
				addImageIdList: data?.noticeImageList?.map(image => image.blogImageId) as  number[],
				deleteImageIdList: [],
			}}
		/>
	);
}