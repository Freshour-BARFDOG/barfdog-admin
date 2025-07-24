import { ReactNode } from "react";
import { commonWrapper } from "@/styles/common.css";
import Tooltip from "@/components/common/tooltip/Tooltip";

interface TooltipWrapperProps {
	title: string | ReactNode;
	children: ReactNode;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function TooltipInfo({
	title,
	children,
	position = 'right',
}: TooltipWrapperProps) {
	return (
		<span className={commonWrapper({ align: 'center', gap: 4, justify: 'start' })}>
			{title}
			<Tooltip position={position}>{children}</Tooltip>
		</span>
	);
}