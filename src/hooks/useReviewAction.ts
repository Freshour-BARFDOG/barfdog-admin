import {useToastStore} from "@/store/useToastStore";
import {usePerformReviewAction} from "@/api/review/mutations/usePerformReviewAction";
import {ReviewActionPayloadMap, ReviewActionType} from "@/types/review";
import {REVIEW_ACTION_LABEL_MAP} from "@/constants/review";

interface UseReviewActionProps {
	onSuccess?: () => void;
	onError?: (err: unknown) => void;
}

export default function useReviewAction({
	onSuccess,
	onError,
}: UseReviewActionProps) {
	const { addToast } = useToastStore();
	const { mutate, isPending } = usePerformReviewAction();

	const handleAction = <T extends ReviewActionType>(
		action: T,
		payload: ReviewActionPayloadMap[T]
	) => {
		const actionLabel = REVIEW_ACTION_LABEL_MAP[action];
		const caseParticle = ['approve', 'selectBest', 'reorderBest'].includes(action) ? '이' : '가';

		if (payload.ids) {
			const isBulk = payload.ids.length > 1;

			const confirmed = window.confirm(
				isBulk
					? `선택한 ${payload.ids.length}개의 리뷰를 ${actionLabel}하시겠습니까?`
					: `이 리뷰를 ${actionLabel}하시겠습니까?`
			);
			if (!confirmed) return;
		}

		mutate({
			action, payload
		}, {
			onSuccess: () => {
				addToast(`${actionLabel}${caseParticle} 완료되었습니다.`);
				onSuccess?.();
			},
			onError: (error) => {
				addToast(`${actionLabel}에 실패했습니다.\n관리자에게 문의해주세요.`);
				onError?.(error);
			}
		})
	}
	return { handleAction, isLoading: isPending };
}