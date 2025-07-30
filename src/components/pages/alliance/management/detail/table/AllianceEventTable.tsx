import { commonWrapper } from "@/styles/common.css";
import { format } from "date-fns";
import TableSection from "@/components/common/tableSection/TableSection";
import Button from "@/components/common/button/Button";
import useItemSelection from "@/hooks/useItemSelection";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import useModal from "@/hooks/useModal";
import AddEventModal from "@/components/pages/alliance/management/detail/modal/AddEventModal";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { TableColumn } from "@/types/common";
import { AllianceEventInfo } from "@/types/alliance";
import { useDeleteAllianceEventList } from "@/api/alliance/mutations/useDeleteAllianceEventList";

interface AllianceEventTableProps {
	eventInfoList: AllianceEventInfo[];
	allianceId: number;
}

export default function AllianceEventTable({
	eventInfoList,
	allianceId,
}: AllianceEventTableProps) {
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();
	const { isOpen, onClose, onToggle } = useModal();
	const {
		selectedIds: deleteSelectedIds,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(eventInfoList, (data) => data.allianceEventId, [] );

	const { mutate } = useDeleteAllianceEventList();

	const handleDeleteSelectedIds = () => {
		mutate({
			allianceEventIdList: deleteSelectedIds as number[]
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_DETAIL, allianceId],
				});
				addToast('행사 삭제가 완료되었습니다!');
				selectAll(false);
			},
			onError: (error) => {
				console.log(error)
				addToast('행사 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	const columns: TableColumn<AllianceEventInfo>[] = [
		{
			key: 'id',
			header: (
				<LabeledCheckbox
					value={allSelected}
					isChecked={allSelected}
					onToggle={(value) => {
						selectAll(!value)
					}}
				/>
			),
			width: '60px',
			render: (row) => (
				<LabeledCheckbox
					value={row.allianceEventId}
					isChecked={isSelected(row.allianceEventId)}
					onToggle={() => toggleSelect(row.allianceEventId)}
				/>
			),
		},
		{ key: 'seq', header: '번호', width: '60px',
			render: (_, index: number) => index + 1,
		},
		{
			key: 'createdEventDate',
			header: '행사 등록일',
			render: (row) => format(new Date(row.createdEventDate), 'yyyy-MM-dd'),
		},
		{ key: 'eventName', header: '행사', render: (row) => row.eventName.toLocaleString() },
		{ key: 'eventCouponCreatedCount', header: '생성', render: (row) => row.eventCouponCreatedCount.toLocaleString() },
		{ key: 'eventCouponRegisteredCount', header: '등록', render: (row) => row.eventCouponRegisteredCount.toLocaleString() },
		{ key: 'eventUsedCount', header: '사용', render: (row) => row.eventUsedCount.toLocaleString() },
		{ key: 'eventGeneralItemCount', header: '일반상품', render: (row) => row.eventGeneralItemCount.toLocaleString() },
		{ key: 'eventSubscriptionItemCount', header: '구독상품', render: (row) => row.eventSubscriptionItemCount.toLocaleString() },
	];

	return (
		<>
		<TableSection
			title='행사 관리'
			data={eventInfoList}
			columns={columns}
			page={0}
			totalPages={0}
			emptyText='행사 목록 데이터가 없습니다.'
			padding='none'
			showDivider={false}
			action={(
				<div className={commonWrapper({ gap: 4, justify: 'start' })}>
					<Button
						onClick={onToggle}
						variant='outline' type='assistive' size='sm'
					>
						행사 추가
					</Button>
					<Button
						onClick={handleDeleteSelectedIds}
						disabled={deleteSelectedIds.length === 0}
						variant='outline' type='assistive' size='sm'
					>
						행사 삭제
					</Button>
				</div>
			)}
		/>
			{isOpen &&
				<AddEventModal
					isOpen={isOpen}
					onClose={onClose}
					eventInfoList={eventInfoList}
					allianceId={allianceId}
				/>
			}
		</>
	);
}