import * as styles from './Tooltip.css';
import { ReactNode, useState } from "react";
import { Info } from "lucide-react";

interface TooltipProps {
	children?: ReactNode;
	trigger?: ReactNode; // tooltip
	position?: 'top' | 'bottom' | 'left' | 'right';
	className?: string;
}

export default function Tooltip({
	children,
	trigger,
	position = 'top',
	className,
}: TooltipProps) {
	const [visible, setVisible] = useState(false);
	
	return (
		<div
			className={styles.wrapper}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			{!trigger ? <Info size={16} /> : trigger}
			{visible && (
				<div className={`${styles.tooltip} ${styles.position[position]} ${className ?? ''}`}>
					{children}
				</div>
			)}
		</div>
	);
}