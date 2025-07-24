'use client';
import { useRouter } from "next/navigation";
import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";
import InputField from "@/components/common/inputField/InputField";
import SearchFilterGroup from "@/components/common/searchFilterGroup/SearchFilterGroup";
import Text from "@/components/common/text/Text";
import TableSection from "@/components/common/tableSection/TableSection";
import useItemSelection from "@/hooks/useItemSelection";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Button from "@/components/common/button/Button";
import Tooltip from "@/components/common/tooltip/Tooltip";
import useSearchValues from "@/hooks/useSearchValues";
import { queryKeys } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/useToastStore";
import { getTableRowNumber } from "@/utils/getTableRowNumber";
import { INITIAL_MANAGEMENT_SEARCH_VALUES } from "@/constants/alliance";
import { SearchFilterItem, TableColumn } from "@/types/common";
import { AllianceManagementData, AllianceManagementSearchParams } from "@/types/alliance";
import { useGetAllianceManagement } from "@/api/alliance/queries/useGetAllianceManagement";
import { useDeleteAllianceList } from "@/api/alliance/mutations/useDeleteAllianceList";

export default function AllianceManagementList() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { addToast } = useToastStore();

	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<AllianceManagementSearchParams>(INITIAL_MANAGEMENT_SEARCH_VALUES);
	const { data } = useGetAllianceManagement(page,submittedValues ?? INITIAL_MANAGEMENT_SEARCH_VALUES);

	const {
		selectedIds: deleteSelectedIds,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(data?.managementList ?? [], (data) => data.allianceId, [] );

	const { mutate } = useDeleteAllianceList();

	const handleDeleteSelectedIds = () => {
		mutate({
			allianceIdList: deleteSelectedIds as number[]
		}, {
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: [queryKeys.ALLIANCE.BASE, queryKeys.ALLIANCE.GET_ALLIANCE_MANAGEMENT, page, submittedValues],
				});
				addToast('제휴사 삭제가 완료되었습니다!');
				selectAll(false);
			},
			onError: (error) => {
				console.log(error)
				addToast('제휴사 삭제에 실패했습니다.\n관리자에게 문의해주세요.');
			}
		})
	}

	const filters: SearchFilterItem[] = [
		{
			label: '제휴사 이름',
			children: (
				<InputField
					width={350}
					value={searchValues.allianceName}
					onSubmit={onSubmit}
					onChange={(e) =>
						setSearchValues({...searchValues, allianceName: e.target.value})
					}
				/>
			),
		}
	]

	const columns: TableColumn<AllianceManagementData>[] = [
		{
			key: 'allianceId',
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
					value={row.allianceId}
					isChecked={isSelected(row.allianceId)}
					onToggle={() => toggleSelect(row.allianceId)}
				/>
			),
		},
		{
			key: "allianceId",
			header: "번호",
			width: "60px",
			render: (row, index) =>
				getTableRowNumber({
					totalElements: data?.page.totalElements as number,
					currentPage: data?.page.number as number,
					pageSize: data?.page.size as number,
					index,
				}).toString(),
		},
		{
			key: 'allianceId',
			header: '상세보기',
			render: (row) => {
				return <Link href={`/alliance/management/${row.allianceId}`}><Text type='body3' color='red'>상세보기</Text></Link>;
			},
		},
		{ key: 'allianceName', header: '제휴사' },
		{
			key: 'eventCount',
			header: '행사',
			render: (row) => {
				return (
					<div className={commonWrapper({ gap: 8, align: 'center' })}>
						<Text type='label4'>{`${row.eventCount}건`}</Text>
						{row.eventInfos.length > 0 &&
							<Tooltip
                position="bottom"
							>
								{row.eventInfos.map(event => (
									<span key={event.allianceEventId}>- {event.eventName}</span>
								))}
							</Tooltip>
						}
					</div>
				)
			}
		},
		{ key: 'allianceCode', header: 'Prefix' },
		{ key: 'createdCouponCount', header: '생성', render: (row) => row.createdCouponCount.toLocaleString() },
		{ key: 'registeredCount', header: '등록', render: (row) => row.registeredCount.toLocaleString() },
		{ key: 'usedCount', header: '사용', render: (row) => row.usedCount.toLocaleString() },
	]

	return (
		<div>
			<SearchFilterGroup
				items={filters}
				onSubmit={onSubmit}
				onReset={onReset}
			/>
			<TableSection
				data={data?.managementList as AllianceManagementData[]}
				columns={columns}
				page={page ?? 0}
				onPageChange={(page: number) => {
					onChangePage(page);
					selectAll(false);
				}}
				totalPages={data?.page?.totalPages ?? 0}
				title='제휴사 목록'
				emptyText='제휴사 목록 데이터가 없습니다.'
				action={(
					<div className={commonWrapper({ gap: 4, justify: 'start' })}>
						<Button
							onClick={() => router.push('/alliance/management/create')}
							variant='outline' type='assistive' size='sm'
						>
							제휴사 등록
						</Button>
						<Button
							onClick={handleDeleteSelectedIds}
							variant='outline' type='assistive' size='sm'
							disabled={deleteSelectedIds.length === 0}
						>
							제휴사 삭제
						</Button>
					</div>
				)}
			/>
		</div>
	);
}