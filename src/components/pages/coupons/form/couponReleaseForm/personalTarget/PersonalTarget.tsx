import * as styles from './PersonalTarget.css';
import { useState } from "react";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import useModal from "@/hooks/useModal";
import SearchMemberModal from "@/components/common/modal/searchMemberModal/SearchMemberModal";
import MemberTable from "@/components/pages/member/table/MemberTable";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import useItemSelection from "@/hooks/useItemSelection";
import { MemberListData } from "@/types/member";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ReleaseCouponFormValues } from "@/types/coupons";

interface PersonalTargetProps {
	setValue: UseFormSetValue<ReleaseCouponFormValues>;
	trigger: UseFormTrigger<ReleaseCouponFormValues>;
}

export default function PersonalTarget({
	setValue,
	trigger,
}: PersonalTargetProps) {
	const { isOpen: isOpenSearchMemberModal, onClose: onCloseSearchMemberModal, onToggle: onToggleSearchMemberModal } = useModal();
	const [selectedMember, setSelectedMember] = useState<MemberListData[]>([]);

	const {
		selectedIds: deleteSelectedIds,
		toggleSelect,
		selectAll,
		isSelected,
		allSelected,
	} = useItemSelection(selectedMember, (member) => member.id,selectedMember?.map((member) => member.id) ?? [] );

	const handleSelect = async (memberList: MemberListData[]) => {
		setSelectedMember(memberList)
		setValue('memberIdList', memberList.map(member => member.id));
		selectAll(false);
		await trigger();
	}

	const handleDeleteSelectedIds = async () => {
		const newSelectedMember = selectedMember.filter(member => !deleteSelectedIds.includes(member.id));
		setSelectedMember(newSelectedMember);
		setValue('memberIdList', newSelectedMember.map(member => member.id));
		await trigger();
	}
	return (
		<>
			<Card shadow='none' backgroundColor='gray100' borderRadius='none' padding={20}>
				<div className={styles.personalTargetControls}>
					<Button onClick={onToggleSearchMemberModal} size='sm'>회원 검색</Button>
					<Button onClick={handleDeleteSelectedIds} disabled={deleteSelectedIds.length < 1} size='sm' variant='outline' type='assistive'>선택 삭제</Button>
					<Button size='sm' variant='outline' type='assistive'>엑셀 업로드</Button>
				</div>
				<div className={styles.personalTargetTable}>
					<MemberTable
						data={{ memberList: selectedMember }}
						showTitle={false}
						padding={20}
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
					/>
				</div>
			</Card>
			{isOpenSearchMemberModal &&
				<SearchMemberModal isOpen={isOpenSearchMemberModal} onClose={onCloseSearchMemberModal} onSelect={handleSelect} defaultSelected={selectedMember} />
			}
		</>
	);
}