import * as styles from './StatList.css';
import { ReactNode } from "react";

interface StatTopInfoProps {
	leftChildren: ReactNode;
	rightChildren?: ReactNode;
}

export default function StatTopInfo({
	leftChildren,
	rightChildren,
}: StatTopInfoProps) {
	return (
		<div className={styles.topInfo}>
			<div className={styles.topInfoLeft}>
				{leftChildren}
			</div>
			{rightChildren && rightChildren}
		</div>
	);
}