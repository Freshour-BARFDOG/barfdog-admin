import * as styles from './InputLabel.css';
import { pointColor } from "@/styles/common.css";
import Text from "@/components/common/text/Text";

interface InputLabelProps {
	label: string;
	labelColor: 'gray700' | 'gray800';
	isRequired?: boolean
}

const InputLabel = ({
	label,
	labelColor,
	isRequired = false,
}: InputLabelProps) => {
	return (
		<Text type='label4' color={labelColor} className={styles.labelStyle}>
			{label} {isRequired && <span className={pointColor}>*</span>}
		</Text>
	);
};

export default InputLabel;