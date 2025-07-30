import { ReactNode } from "react";
import * as styles from './StatList.css';
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import Card from "@/components/common/card/Card";

interface StatListLayoutProps {
	width?: 'sm' | 'md' | 'lg' | 'full';
	title?: string | ReactNode;
	children: ReactNode;
}

export default function StatListLayout({
	width = 'full',
	title,
	children,
}: StatListLayoutProps) {
	return (
		<Card shadow="none" padding={20} gap={16} align="start" className={styles.container({ width })}>
			{title && <Text type="title4">{title}</Text>}
			<Divider thickness={1} color="gray300" />
			<div className={styles.rows}>{children}</div>
		</Card>
	);
}