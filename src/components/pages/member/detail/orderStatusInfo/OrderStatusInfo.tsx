import { useQueryClient } from "@tanstack/react-query";
import { infoItemValue } from "@/components/pages/member/detail/MemberDetail.css";
import InfoList from "@/components/common/infoList/InfoList";
import Button from "@/components/common/button/Button";
import Chips from "@/components/common/chips/Chips";
import useModal from "@/hooks/useModal";
import UpdateGradeModal from "@/components/common/modal/updateGradeModal/UpdateGradeModal";
import { queryKeys } from "@/constants/queryKeys";
import { useToastStore } from "@/store/useToastStore";
import { GradeType } from "@/types/member";
import { useUpdateMemberGrade } from "@/api/member/mutations/useUpdateMemberGrade";

interface SubscriptionInfoData {
	accumulatedAmount: number;
	accumulatedSubscribe: number;
	grade: GradeType;
	subscribe: boolean;
	dogNames: string[];
	alliance: null | 'cb';
}

interface SubscriptionInfoProps {
	memberId: number;
	data: SubscriptionInfoData;
}

export default function OrderStatusInfo({
	memberId,
	data,
}: SubscriptionInfoProps) {
	const queryClient = useQueryClient();

	const { mutate: updateGrade } = useUpdateMemberGrade();

	const { isOpen: isOpenUpdateGradeModal, onClose: onCloseUpdateGradeModal, onToggle: onToggleUpdateGradeModal } = useModal();
	const { addToast } = useToastStore();

	const handleUpdateGrade = (grade: GradeType) => {
		updateGrade({
			memberId: memberId,
			grade: grade,
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.MEMBER.BASE, queryKeys.MEMBER.GET_MEMBER_DETAIL, memberId],
				});
				onCloseUpdateGradeModal();
				addToast('등급 변경이 완료되었습니다!');
			},
			onError: (error) => {
				console.log(error)
				addToast('등급 변경에 실패했습니다');
			}
		})
	}

	const subscriptionInfo = [
		{ label: '누적 구매 금액', value: `${data.accumulatedAmount.toLocaleString()}원` },
		{
			label: '등급',
			value: (
				<div className={infoItemValue}>
					{data.grade}<Button onClick={onToggleUpdateGradeModal} variant='outline' size='sm'>변경</Button>
				</div>
			),
		},
		{
			label: '정기 구독 여부',
			value: (
				<div className={infoItemValue}>
					{data.subscribe ? 'Y' : 'N'}
				</div>
			),
		},
		{ label: '누적 구독 횟수', value: `${data.accumulatedSubscribe}회` },
		{
			label: '반려견',
			value: (
				<div className={infoItemValue}>
					{data.dogNames.length === 0 ? '-'
						: data.dogNames.map((dog, index) => (
							<Chips key={`${dog}-${index}`} variant='solid' color='gray600' borderRadius='lg'>{dog}</Chips>
						))}
				</div>
			),
		},
		{ label: '제휴사', value: data.alliance ?? '-' },
	];
	return (
		<>
			<InfoList
				title='구매 현황'
				items={subscriptionInfo}
				width='calc(40% - 10px)'
			/>
			{isOpenUpdateGradeModal &&
	      <UpdateGradeModal
	        isOpen={isOpenUpdateGradeModal}
	        onClose={onCloseUpdateGradeModal}
	        onConfirm={handleUpdateGrade}
	        initialGrade={data.grade}
	      />
			}
		</>
	);
}