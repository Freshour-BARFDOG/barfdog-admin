import * as styles from './FormControls.css';
import Button from "@/components/common/button/Button";

interface FormProps {
	cancelText?: string;
	confirmText?: string;
	onCancel?: () => void;
	onConfirm?: () => void;
	isConfirmDisabled?: boolean;
	fullWidth?: boolean;
}

export default function FormControls({
	cancelText = '취소',
	confirmText = '확인',
	onCancel,
	onConfirm,
	isConfirmDisabled = false,
	fullWidth = false,
}: FormProps) {
	return (
		<div className={styles.formControls}>
			{onCancel &&
				<Button onClick={onCancel} variant='outline' type='assistive' fullWidth={fullWidth}>{cancelText}</Button>
			}
			{onConfirm &&
				<Button onClick={onConfirm} disabled={isConfirmDisabled} fullWidth={fullWidth}>{confirmText}</Button>
			}
		</div>
	);
}