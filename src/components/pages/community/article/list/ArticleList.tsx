'use client';
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import CommunityList from "@/components/pages/community/common/CommunityList";
import Button from "@/components/common/button/Button";
import useModal from "@/hooks/useModal";
import RecommendArticleModal from "@/components/pages/community/article/list/modal/RecommendArticleModal";
import usePaginationQuery from "@/hooks/usePaginationQuery";
import { PAGE_SIZE, STATUS } from "@/constants/common";
import { CommunityListData } from "@/types/community";
import { Page } from "@/types/common";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { useGetCommunityList } from "@/api/community/queries/useGetCommunityList";
import { useDeleteCommunity } from "@/api/community/mutations/useDeleteCommunity";
import { prefetchGetRecommendArticle } from "@/api/community/queries/useGetRecommendArticle";

export default function ArticleList() {
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		page,
		onChangePage,
	} = usePaginationQuery();
	const { data } = useGetCommunityList({
		type: 'article',
		key: 'queryBlogsAdminDtoList',
		page,
		size: PAGE_SIZE.COMMUNITY.ARTICLE,
		queryKey: [
			queryKeys.COMMUNITY.BASE,
			queryKeys.COMMUNITY.GET_ARTICLE_LIST,
			page,
		],
	})
	const { mutate } = useDeleteCommunity();

	const { addToast } = useToastStore();
	const { isOpen, onClose, onToggle } = useModal();

	const handleOpenRecommendArticle = async () => {
		await prefetchGetRecommendArticle(queryClient);
		onToggle();
	}

	return (
		<>
			<CommunityList
				title='아티클'
				data={data?.list as CommunityListData[]}
				page={page}
				onChangePage={onChangePage}
				pageData={data?.page as Page}
				columns={[
					{ key: 'title', header: '제목' },
					{ key: 'createdDate', header: '작성일', render: (row: CommunityListData) => format(new Date(row.createdDate), 'yyyy-MM-dd') },
					{ key: 'status', header: '노출 여부', render: (row: CommunityListData) => STATUS[row.status] },
				]}
				createHref='/community/article/create'
				onEditClick={(row) => router.push(`/community/article/${row.id}`)}
				onDelete={async (id) => {
					mutate({
						type: 'article',
						id,
					}, {
						onSuccess: async () => {
							await queryClient.invalidateQueries({
								queryKey: [queryKeys.COMMUNITY.BASE, queryKeys.COMMUNITY.GET_ARTICLE_LIST, page],
							});
							addToast('아티클 삭제가 완료되었습니다!');
						},
						onError: (error) => {
							console.log(error)
							addToast('아티클 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
						}
					})
				}}
				action={(
					<Button
						onClick={handleOpenRecommendArticle}
						variant='outline'
						type='assistive'
						size='sm'
					>
						추천 아티클
					</Button>
				)}
			/>
			{isOpen &&
				<RecommendArticleModal isOpen={isOpen} onClose={onClose} />
			}
		</>
	);
}