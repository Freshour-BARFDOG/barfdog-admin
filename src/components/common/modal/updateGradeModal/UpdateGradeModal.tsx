import * as styles from './UpdateGradeModal.css';
import { useState } from "react";
import ModalBackground from "@/components/common/modal/modalBackground/ModalBackground";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import SelectBox from "@/components/common/selectBox/SelectBox";
import { SEARCH_GRADE_LIST } from "@/constants/member";
import { GradeType } from "@/types/common";

interface UpdateGradeModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: (value: GradeType) => void;
	initialGrade?: GradeType | '';
}

export default function UpdateGradeModal({
	isOpen,
	onClose,
	onConfirm,
	initialGrade = '',
}: UpdateGradeModalProps) {
	const gradeOptions = SEARCH_GRADE_LIST.map(string => ({ label: string, value: string }));
	const [selectedGrade, setSelectedGrade] = useState(initialGrade);

	return (
		<ModalBackground
			isVisible={isOpen}
			onClose={onClose}
			closeOnBackgroundClick={false}
			isDimmed
		>
			<Card shadow='none' padding={20} gap={20} width='auto' className={styles.changeGradeContainer}>
				<Text type='label1'>회원 등급 변경</Text>
				<div className={styles.changeGradeSelectBox}>
					<Text type='label2'>변경할 등급을 선택해주세요.</Text>
					<SelectBox
						options={gradeOptions}
						value={selectedGrade}
						onChange={(value) => setSelectedGrade(value as GradeType)}
						fullWidth
					/>
				</div>
				<div className={styles.changeGradeControls}>
					<Button onClick={onClose} fullWidth size='sm' variant='outline' type='assistive'>취소</Button>
					<Button onClick={() => onConfirm(selectedGrade as GradeType)} fullWidth size='sm'>확인</Button>
				</div>
			</Card>
		</ModalBackground>
	);
}