import { useState } from "react";
import { commonWrapper } from "@/styles/common.css";
import AddEventInput from "@/components/pages/alliance/common/addEventInput/AddEventInput";
import FormControls from "@/components/common/formControls/FormControls";
import FullModal from "@/components/common/modal/fullModal/FullModal";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { AllianceEventInfo } from "@/types/alliance";
import { useCreateAllianceEvent } from "@/api/alliance/mutations/useCreateAllianceEvent";

interface AddEventModalProps {
	isOpen: boolean;
	onClose: () => void;
	allianceId: number;
	eventInfoList: AllianceEventInfo[];
}

export default function AddEventModal({
	isOpen,
	onClose,
	allianceId,
	eventInfoList,
}: AddEventModalProps) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const [eventNameList , setEventNameList] = useState<string[]>([]);
	const [eventError , setEventError] = useState<string>('');
	const { mutateAsync } = useCreateAllianceEvent();

	const handleAddEvent = async () => {
		const hasOverlap = eventInfoList.some(event =>
			eventNameList.includes(event.eventName)
		);
		if (hasOverlap) {
			setEventError('이미 등록된 행사입니다. 다시 입력해 주세요.');
			return;
		}

		const results = await Promise.allSettled(
			eventNameList.map(name =>
				mutateAsync({
					body: {
						allianceEventName: name,
						allianceId: Number(allianceId),
					},
				})
			)
		);

		const successes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
		const failures = results.filter(r => r.status === 'rejected').map(r => ({ reason: r.reason }));

		if (failures.length === 0) {
			await queryClient.invalidateQueries({
				queryKey: [
					queryKeys.ALLIANCE.BASE,
					queryKeys.ALLIANCE.GET_ALLIANCE_DETAIL,
					allianceId,
				],
			});

			onClose();
			addToast('행사 추가가 완료되었습니다!');
		} else if (successes.length > 0) {
			addToast(`${successes.length}개 행사는 성공적으로 추가됐습니다.`);
		} else {
			addToast('행사 추가에 실패했습니다.\n관리자에게 문의해주세요.')
			console.warn('일부 이벤트 생성 실패:', failures);
		}
	}
	return (
		<FullModal
			isVisible={isOpen}
			handleClose={onClose}
			title='행사 추가'
			padding={20}
			width={450}
		>
			<div className={commonWrapper({ direction: 'col', justify: 'center', align: 'center', gap: 20 })}>
				<AddEventInput
					eventNameList={eventNameList}
					setEventNameList={setEventNameList}
					eventError={eventError}
					setEventError={setEventError}
				/>
				<FormControls
					cancelText='취소'
					confirmText='추가'
					onCancel={onClose}
					onConfirm={handleAddEvent}
					isConfirmDisabled={eventNameList.length === 0}
					fullWidth
				/>
			</div>
		</FullModal>
	);
}