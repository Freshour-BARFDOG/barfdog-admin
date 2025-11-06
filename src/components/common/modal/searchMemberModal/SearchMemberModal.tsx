import * as styles from './SearchMemberModal.css';
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Button from "@/components/common/button/Button";
import MemberTable from "@/components/pages/member/table/MemberTable";
import FullModal from "@/components/common/modal/fullModal/FullModal";
import DateRangeFilter from '../../dateRangeFilter/DateRangeFilter';
import TooltipInfo from '../../tooltip/TooltipInfo';
import SearchFilterGroup from '../../searchFilterGroup/SearchFilterGroup';
import useItemSelection from "@/hooks/useItemSelection";
import useSearchValues from "@/hooks/useSearchValues";
import { useSearchCategoryKeyword } from '@/hooks/useSearchCategoryKeyword';
import { INITIAL_SEARCH_VALUES } from "@/constants/member";
import { SEARCH_CATEGORY } from "@/constants/common";
import { MemberListData, MemberListSearchParams, MemberListResponse} from "@/types/member";
import { SearchFilterItem, SelectOption } from '@/types/common';
import { useGetMemberList } from "@/api/member/queries/useGetMemberList";

interface SearchMemberModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (selectedIds: MemberListData[]) => void;
	defaultSelected?: MemberListData[];
}

export default function SearchMemberModal({
	isOpen,
	onClose,
	onSelect,
	defaultSelected = [],
}: SearchMemberModalProps) {
	const {
		searchValues,
		setSearchValues,
		submittedValues,
		page,
		onChangePage,
		onSubmit,
		onReset,
	} = useSearchValues<MemberListSearchParams>(INITIAL_SEARCH_VALUES, { disableUrlSync: true });
	const { data, isFetching } = useGetMemberList(page, submittedValues ?? INITIAL_SEARCH_VALUES, 20);

	const {
		keyword,
		selectedCategory,
		setSelectedCategory,
		onChangeCategory,
		onChangeKeyword,
	} = useSearchCategoryKeyword<MemberListSearchParams, 'email' | 'name'>({
		searchValues,
		setSearchValues,
		initialCategoryOptions: ['email', 'name'],
	});

	const memberList = data?.memberList ?? [];
	
	const {
		selectedIds,
		toggleSelect,
		selectAll,
		isSelected,
	} = useItemSelection(
		memberList, 
		(member) => member.id,
		defaultSelected?.map((member) => member.id) ?? [] 
	);

	const currentPageIds = memberList.map((m) => m.id) ?? [];
	const allSelected = currentPageIds.length > 0 &&
		currentPageIds.every((id) => selectedIds.includes(id));
	const isSelectedIdsFromCurrentPage = Boolean(currentPageIds.filter(id => selectedIds.includes(id)).length > 0);

	const handleClose = () => {
		onClose();
		onReset();
	};

	const handleSelect = () => {
		if (selectedIds.length < 1) return;

		const selectedFromCurrentPage =
			memberList.filter(member => selectedIds.includes(member.id)) ?? [];

		const merged = [...defaultSelected, ...selectedFromCurrentPage];

		// ID 기준 중복 제거하면서 member 객체 전체 유지
		const uniqueById = Array.from(
			new Map(merged.map(member => [member.id, member])).values()
		);

		onSelect(uniqueById);
		handleClose();
	}

	const filters: SearchFilterItem[] = [
		{
			label: (
				<TooltipInfo title='조회 기간'>
					좌측 조회기간은 우측 조회기간보다 과거시점이어야 합니다.
				</TooltipInfo>
			),
			children: (
				<DateRangeFilter
					value={{
						startDate: searchValues.from,
						endDate: searchValues.to,
					}}
					onChangeRange={(value) => {
						const { startDate, endDate } = value;
						setSearchValues({
							...searchValues,
							from: startDate as string,
							to: endDate as string,
						})
					}}
				/>
			),
			align: 'start'
		},
		{
			label: '회원 검색',
			children: (
				<SearchFilterKeyword
					categoryOptions={SEARCH_CATEGORY as SelectOption<'email' | 'name'>[]}
					selectedCategory={selectedCategory}
					keyword={keyword}
					onChangeCategory={onChangeCategory}
					onChangeKeyword={onChangeKeyword}
					onSubmit={onSubmit}
				/>
			),
		},
	]

	// 데이터가 없을 때도 모달은 렌더링하되, 빈 데이터로 처리
	const displayData: MemberListResponse = data ?? {
		memberList: [],
		page: {
			totalPages: 0,
			totalElements: 0,
			number: 0,
			size: 20,
		},
	};

	return (
		<FullModal
			isVisible={isOpen}
			handleClose={handleClose}
			title='회원 검색'
			className={styles.searchMemberModalContainer}
		>
			<div className={styles.searchMemberContent}>
				<SearchFilterGroup
					items={filters}
					padding='none'
				/>
				<div className={styles.searchMemberControls}>
					<Button onClick={onSubmit} size='sm' disabled={isFetching}>
						{isFetching ? '검색 중...' : '검색'}
					</Button>
					<Button 
						onClick={() => {
							onReset();
							setSelectedCategory('email');
						}} 
						size='sm' 
						variant='outline'
						disabled={isFetching}
					>
						초기화
					</Button>
				</div>
				<div>
					<MemberTable
						data={displayData}
						firstRow={{
							key: 'id',
							header: (
								<LabeledCheckbox
									value={allSelected}
									isChecked={allSelected}
									onToggle={(value) => selectAll(!value)}
									disabled={isFetching}
								/>
							),
							width: '60px',
							render: (row) => (
								<LabeledCheckbox
									value={row.id}
									isChecked={isSelected(row.id)}
									onToggle={() => toggleSelect(row.id)}
									disabled={isFetching}
								/>
							),
						}}
						page={page}
						onChangePage={onChangePage}
						padding='none'
					/>
					<div className={styles.searchMemberButton}>
						<Button 
							onClick={handleSelect} 
							disabled={selectedIds.length < 1 || isFetching || !isSelectedIdsFromCurrentPage} 
							fullWidth
						>
							고객 추가
						</Button>
					</div>
				</div>
			</div>
		</FullModal>
	);
}