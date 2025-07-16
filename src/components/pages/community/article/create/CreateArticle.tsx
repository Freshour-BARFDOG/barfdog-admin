'use client';
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { queryKeys } from "@/constants/queryKeys";
import { ArticleFormValues, CreateArticleFormValues } from "@/types/community";
import { useCreateArticle } from "@/api/community/mutations/useCreateArticle";
import ArticleForm from "@/components/pages/community/article/form/ArticleForm";

export default function CreateArticle() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useCreateArticle();
	const { addToast } = useToastStore();

	const onSubmit = (data: ArticleFormValues) => {
		const body = {
			status: data.status,
			title: data.title,
			contents: data.contents,
			category: data.category,
			thumbnailId: data.thumbnailId,
			blogImageIdList: data.addImageIdList,
		}
		mutate({
			body: body as CreateArticleFormValues,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [
						queryKeys.COMMUNITY.BASE,
						queryKeys.COMMUNITY.GET_ARTICLE_LIST,
						0
					],
				});
				addToast('등록이 완료되었습니다!');
				router.push('/community/article');
			},
			onError: (error) => {
				console.log(error)
				addToast('등록에 실패했습니다\n관리자에게 문의해주세요.');
			}
		})
	}

	return (
		<ArticleForm
			onSubmit={onSubmit}
			defaultUpdateFormValue={{
				title: '',
				status: 'LEAKED',
				contents: '',
				category: null,
				thumbnailId: null,
				addImageIdList: [],
				deleteImageIdList: [],
			}}
		/>
	);
}