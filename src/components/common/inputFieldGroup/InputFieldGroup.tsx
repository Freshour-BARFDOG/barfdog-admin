import * as styles from './InputFieldGroup.css';
import { ReactNode } from "react";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import Divider from "@/components/common/divider/Divider";

interface InputFieldGroupProps {
	label: string;
	children: ReactNode;
	divider?: boolean;
	dividerColor?: 'gray200' | 'gray300';
	isLabelRequired?: boolean;
	align?: 'center' | 'start';
}

export default function InputFieldGroup({
	label,
	children,
	divider = true,
	dividerColor = 'gray200',
	isLabelRequired = true,
	align = 'center',
}: InputFieldGroupProps) {
	return (
		<>
		<div className={styles.inputFieldGroup({ align })}>
			<InputLabel label={label} isRequired={isLabelRequired} labelColor='gray800' className={styles.inputFieldGroupLabel} />
			{children}
		</div>
		{divider && <Divider thickness={1} color={dividerColor} /> }
		</>
	);
}