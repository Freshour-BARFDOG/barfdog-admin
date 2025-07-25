'use client';
import * as styles from './ReviewDetail.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { themeVars } from "@/styles/theme.css";
import { commonWrapper } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import DetailTable from "@/components/common/detailTable/DetailTable";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import ImageSlider from "@/components/common/imageSlider/imageSlider";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import InputField from "@/components/common/inputField/InputField";
import useModal from "@/hooks/useModal";
import useReviewAction from "@/hooks/useReviewAction";
import { queryKeys } from "@/constants/queryKeys";
import { REVIEW_STATUS } from "@/constants/review";
import { useGetReviewDetail } from "@/api/review/queries/useGetReviewDetail";
import { TableItem } from '@/types/common';

interface ReviewDetailProps {
	reviewId: number;
}

export default function ReviewDetail({ reviewId }: ReviewDetailProps) {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data } = useGetReviewDetail(reviewId);
	const reviewStatus = data?.reviewInfo.status;

	const [reason, setReason] = useState('');
	const { isOpen, onClose, onToggle } = useModal();
	
	const { handleAction } = useReviewAction({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [queryKeys.REVIEW.BASE, queryKeys.REVIEW.GET_REVIEW_DETAIL, reviewId],
			});
		},
	})
	
	if(!data) return null;

	const reviewInfoList = [
		{
			label: '리뷰 ID',
			value: data.reviewInfo.id,
			align: 'center'
		},
		{
			label: '처리 상태',
			value: (
				<Chips variant={data.reviewInfo.status === 'APPROVAL' ? 'outlined' : 'solid'} color='red' size='md' borderRadius='lg'>
					{data.reviewInfo.status === 'REQUEST' ? '승인' : ''}{REVIEW_STATUS[data.reviewInfo.status]}
				</Chips>
			),
			align: 'center'
		},
		{
			label: '작성자',
			value: data.reviewInfo.username,
			align: 'center'
		},
		{
			label: '베스트 리뷰',
			value: (
				<Chips variant='solid' borderRadius='lg'>
					{data.bestReview ? 'Y' : 'N'}
				</Chips>
			),
			align: 'center'
		},
		{
			label: '작성일',
			value: data.reviewInfo.writtenDate,
			align: 'center'
		},
		{
			label: '평점',
			value: Array.from({ length: 5 }, (_, i) => (
					<Star
						key={i}
						size={20}
						strokeWidth={0}
						fill={i < data.reviewInfo.star
							? themeVars.colors.yellow.yellow500
							: themeVars.colors.gray.gray300
						}
					/>
				)
			),
			align: 'center'
		},
		{
			label: '작성 글',
			value: <Text className={styles.reviewDetailContents} type='body3' preLine>{data.reviewInfo.contents}</Text>,
			align: 'center',
			fullWidth: true,
		},
		data.imageUrlList.length > 0 && {
			label: '등록 이미지',
			value: (
				<div className={styles.reviewDetailImageList}>
					<ImageSlider imageList={data.imageUrlList} defaultImageIndex={0} showPadding={false} />
				</div>
			),
			align: 'center',
			fullWidth: true,
		}
	].filter(Boolean) as TableItem[];

	return (
		<>
			<div className={commonWrapper({ direction: 'col', gap: 12, justify: 'start' })}>
			<div className={commonWrapper({ gap: 4, justify: 'start' })}>
				{data.reviewInfo.status === 'REQUEST' &&
					<>
						<Button
							disabled={reviewStatus === 'APPROVAL'}
							onClick={() => handleAction('approve', { ids: [data.reviewInfo.id] })}
							size='sm' variant='outline' type='assistive'
						>
							리뷰 승인
						</Button>
						<Button
							disabled={reviewStatus === 'RETURN'}
							onClick={onToggle}
							size='sm' variant='outline' type='assistive'
						>
							리뷰 반려
						</Button>
          </>
				}
				{reviewStatus !== 'RETURN' && reviewStatus !== 'REQUEST' &&
					<Button
						disabled={data.bestReview}
            onClick={() => handleAction('selectBest', { ids: [data.reviewInfo.id] })}
						size='sm' variant='outline' type='assistive'
					>
						베스트 리뷰 선정
					</Button>
				}
			</div>
			<Card shadow='none' padding={20}>
				<DetailTable items={reviewInfoList} columns={2} title='리뷰 정보' />
			</Card>
			<Button onClick={() => router.push('/review')}>목록</Button>
		</div>
			{isOpen &&
				<AlertModal
					content={(
						<div className={commonWrapper({ direction: 'col', align: 'center', gap: 20 })}>
							<Text type='label2' align='center' block>리뷰 반려 사유를 입력해주세요.</Text>
							<InputField
								value={reason}
								onChange={(e) => setReason(e.target.value)}
								min={1}
							/>
						</div>
					)}
					isOpen={isOpen}
					onClose={() => {
						onClose();
						setReason('');
					}}
					cancelText='취소'
					confirmText='확인'
          isConfirmDisabled={reason.length < 1}
					onConfirm={() => {
						handleAction(
							'reject',
							{
								ids: [data.reviewInfo.id],
								reason: reason,
							}
						)
					}}
				/>
			}
		</>
	);
}