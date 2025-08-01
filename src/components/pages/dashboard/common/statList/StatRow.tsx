import * as styles from './StatList.css';
import { Children, Fragment, ReactNode } from "react";
import DividerVertical from "@/components/common/dividerVertical/DividerVertical";

interface StatRowProps {
	columns?: 1 | 2 | 3;
	layoutRatio?: 'equal' | 'wideLeft' | 'wideRight';
	children: ReactNode;
}

export default function StatRow({
	columns = 2,
	layoutRatio = 'equal',
	children,
}: StatRowProps) {
	const childrenArray = Children.toArray(children);

	return (
		<Fragment>
			<div className={styles.grid({ columns, layoutRatio })}>
				{childrenArray.map((child, index) => (
					<Fragment key={index}>
						<div>{child}</div>
						{index !== childrenArray.length - 1 && (
							<DividerVertical thickness={1} color='gray300' />
						)}
					</Fragment>
				))}
			</div>
		</Fragment>
	);
}