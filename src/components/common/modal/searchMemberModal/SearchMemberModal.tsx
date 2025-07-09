import * as styles from './SearchMemberModal.css';
import { useState } from "react";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import Card from "@/components/common/card/Card";
import SearchFilterKeyword from "@/components/common/searchFilterKeyword/SearchFilterKeyword";
import Text from "@/components/common/text/Text";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Button from "@/components/common/button/Button";
import InputFieldGroup from "@/components/common/inputFieldGroup/InputFieldGroup";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import CloseIcon from "/public/images/icons/close.svg";
import MemberTable from "@/components/pages/member/table/MemberTable";
import useItemSelection from "@/hooks/useItemSelection";
import useSearchValues from "@/hooks/useSearchValues";
import { useGetMemberList } from "@/api/member/queries/useGetMemberList";
import { INITIAL_SEARCH_VALUES } from "@/constants/member";
import { SEARCH_CATEGORY } from "@/constants/common";
import { MemberListData, MemberListSearchParams} from "@/types/member";

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
	} = useSearchValues<MemberListSearchParams>(INITIAL_SEARCH_VALUES);
	const { data } = useGetMemberList(page,submittedValues ?? INITIAL_SEARCH_VALUES);
	const [selectedCategory, setSelectedCategory] = useState<'email' | 'name'>('email');

	const {
		selectedIds,
		toggleSelect,
		selectAll,
		isSelected,
	} = useItemSelection(data?.memberList ?? [], (member) => member.id,defaultSelected?.map((member) => member.id) ?? [] );

	const currentPageIds = data?.memberList.map((m) => m.id) ?? [];
	const allSelected = currentPageIds.length > 0 &&
		currentPageIds.every((id) => selectedIds.includes(id));

	const handleClose = () => {
		onClose();
		onReset();
	};

	const handleSelect = () => {
		if (selectedIds.length < 1) return;

		const selectedFromCurrentPage =
			data?.memberList.filter(member => selectedIds.includes(member.id)) ?? [];

		const merged = [...defaultSelected, ...selectedFromCurrentPage];

		// ID 기준 중복 제거하면서 member 객체 전체 유지
		const uniqueById = Array.from(
			new Map(merged.map(member => [member.id, member])).values()
		);

		onSelect(uniqueById);
		handleClose();
	}

	if (!data) return null;
	return (
		<ModalBackground
			isVisible={isOpen}
			onClose={handleClose}
			isDimmed
			closeOnBackgroundClick={false}
		>
			<Card shadow='none' width='auto' justify='start' className={styles.searchMemberModalContainer}>
				<div className={styles.searchMemberHeader}>
					<Text type='title2' color='white'>회원 검색</Text>
					<button onClick={handleClose}><SvgIcon src={CloseIcon} color='white' /></button>
				</div>
				<div className={styles.searchMemberContent}>
					<InputFieldGroup label='회원 검색' divider={false}>
						<SearchFilterKeyword
							categoryOptions={SEARCH_CATEGORY}
							selectedCategory={selectedCategory}
							keyword={searchValues[selectedCategory]}
							onChangeCategory={(category) => setSelectedCategory(category as 'email' | 'name')}
							onChangeKeyword={(keyword) => {
								setSearchValues({...searchValues, [selectedCategory]: keyword});
							}}
							onSubmit={onSubmit}
						/>
					</InputFieldGroup>
					<div className={styles.searchMemberControls}>
						<Button onClick={onSubmit} size='sm'>검색</Button>
						<Button onClick={onReset} size='sm' variant='outline'>초기화</Button>
					</div>
					<div>
						<MemberTable
							data={data}
							firstRow={{
								key: 'id',
								header: (
									<LabeledCheckbox
										value={allSelected}
										isChecked={allSelected}
										onToggle={(value) => selectAll(!value)}
									/>
								),
								width: '60px',
								render: (row) => (
									<LabeledCheckbox
										value={row.id}
										isChecked={isSelected(row.id)}
										onToggle={() => toggleSelect(row.id)}
									/>
								),
							}}
							page={page}
							onChangePage={onChangePage}
							padding='none'
						/>
						<div className={styles.searchMemberButton}>
							<Button onClick={handleSelect} disabled={selectedIds.length < 1} fullWidth>고객 추가</Button>
						</div>
					</div>
				</div>
			</Card>
		</ModalBackground>
	);
}