import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";

interface StatLabelProps {
	label: string;
	value: string | number;
	unit?: string;
}

export default function StatLabel({
	label,
	value,
	unit,
}: StatLabelProps) {
	return (
		<div className={commonWrapper({ width: 'auto', gap: 4 })}>
			<Text type='body3'>{label}</Text>
			<Text type='body3'><strong>{value}</strong>{unit}</Text>
		</div>
	);
}