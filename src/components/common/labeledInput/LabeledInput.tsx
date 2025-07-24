import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";

interface LabeledInputProps {
	children: ReactNode;
	label?: string;
	caption?: string;
}

export default function LabeledInput({
	children,
	label,
	caption,
}: LabeledInputProps) {
	return (
		<div className={commonWrapper({ width: 'auto', direction: 'col', gap: 4, align: 'start' })}>
			<div className={commonWrapper({ align: 'center', gap: 8, justify: 'start' })}>
				{children}
				{label &&
					<Text type="body3">{label}</Text>
				}
			</div>
			{caption &&
				<Text type="caption" color='gray500' block>{caption}</Text>
			}
		</div>
	);
}