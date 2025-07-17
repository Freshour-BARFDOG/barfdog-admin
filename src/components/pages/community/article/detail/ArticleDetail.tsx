'use client';
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { StatusType } from "@/types/common";
import { ArticleCategory, ArticleDetailResponse, ArticleFormValues } from "@/types/community";
import { queryKeys } from "@/constants/queryKeys";
import { useGetCommunityDetail } from "@/api/community/queries/useGetCommunityDetail";
import { useUpdateCommunity } from "@/api/community/mutations/useUpdateCommunity";
import ArticleForm from "@/components/pages/community/article/form/ArticleForm";

interface NoticeDetailProps {
	articleId: number;
}

export default function ArticleDetail({ articleId }: NoticeDetailProps) {
	const queryClient = useQueryClient();

	const { data } = useGetCommunityDetail<ArticleDetailResponse>('article', articleId);
	const { mutate } = useUpdateCommunity<ArticleFormValues>('article');

	const { addToast } = useToastStore();

	const onSubmit = (data: ArticleFormValues) => {
		mutate({
			body: data,
			id: articleId,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_ARTICLE_DETAIL,
						articleId,
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
		<ArticleForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				id: data?.articleInfo.id,
				status: data?.articleInfo.status ?? 'LEAKED' as StatusType,
				title: data?.articleInfo.title ?? '',
				category: data?.articleInfo.category ?? '' as ArticleCategory,
				contents: data?.articleInfo.contents ?? '',
				thumbnailId: data?.articleInfo.thumbnailId ?? 0,
				thumbnailUrl: data?.articleInfo.thumbnailUrl ?? '',
				filename: data?.articleInfo.filename ?? '',
				addImageIdList: data?.articleImageList?.map(image => image.blogImageId) as number[],
				deleteImageIdList: [],
			}}
		/>
	);
}