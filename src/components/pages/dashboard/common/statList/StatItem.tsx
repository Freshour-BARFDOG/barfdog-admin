import * as styles from './StatList.css';
import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";
import Text from "@/components/common/text/Text";

interface StatItem {
	label?: string;
	value: string | ReactNode;
}

interface StatItemProps {
	items: StatItem[];
}

export default function StatItem({
	items
}: StatItemProps) {
	return (
		<div className={styles.item}>
			{items.map((item, idx) => (
				<div
					key={item.label ?? idx}
					className={commonWrapper({ justify: 'between', align: 'center' })}
				>
					{item.label && <Text type="body3">{item.label}</Text>}
					{typeof item.value === 'string'
						? <Text type="label1">{item.value}</Text>
						: item.value}
				</div>
			))}
		</div>
	);
}