import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import FormControls from "@/components/common/formContorls/FormControls";
import FullModal from "@/components/common/modal/fullModal/FullModal";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { useGetRecommendArticle } from "@/api/community/queries/useGetRecommendArticle";
import { useUpdateRecommendArticle } from "@/api/community/mutations/useUpdateRecommendArticle";

interface RecommendArticleModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function RecommendArticleModal({
	isOpen,
	onClose,
}: RecommendArticleModalProps) {
	const queryClient = useQueryClient();
	const { data } = useGetRecommendArticle();
	const { mutate } = useUpdateRecommendArticle();

	const { addToast } = useToastStore();

	const [blogIdMap, setBlogIdMap] = useState<{ [key: number]: number }>({
		1: data?.selectedArticleList.find(a => a.articleNumber === 1)?.blogId ?? 0,
		2: data?.selectedArticleList.find(a => a.articleNumber === 2)?.blogId ?? 0,
	});

	const handleChange = (articleNumber: number, newBlogId: number) => {
		setBlogIdMap(prev => ({
			...prev,
			[articleNumber]: newBlogId,
		}));
	};

	const onSubmit = () => {
		const { 1: first, 2: second } = blogIdMap;

		if (!first || !second) {
			addToast('추천 아티클을 모두 선택해주세요.');
			return;
		}

		const body = {
			firstBlogId: first,
			secondBlogId: second,
		};

		mutate({ body }, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_RECOMMEND_ARTICLE],
				});
				addToast('추천 아티클 수정이 완료되었습니다!');
				onClose();
			},
			onError: (error) => {
				console.log(error)
				addToast('추천 아티클 수정에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	if (!data) return;
	return (
		<FullModal title='추천 아티클 설정' padding={16} isVisible={isOpen} handleClose={onClose}>
			<div className={commonWrapper({ direction: 'col', gap: 32, align: 'start' })}>
				{[1, 2].map(num => (
					<div key={num} className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
						<Text type='label2'>추천 아티클{num}</Text>
						<SelectBox
							options={data?.articleTitleList}
							value={blogIdMap[num]}
							onChange={(value) => handleChange(num, value)}
							fullWidth
						/>
					</div>
				))}
				<div />
			</div>
			<FormControls
				cancelText='닫기'
				confirmText='저장'
				onCancel={onClose}
				onConfirm={onSubmit}
			/>
		</FullModal>
	);
}