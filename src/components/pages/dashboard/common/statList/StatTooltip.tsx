import TooltipInfo from "@/components/common/tooltip/TooltipInfo";

interface StatTooltipProps {
	title: string;
}

export default function StatTooltip({
	title,
}: StatTooltipProps) {
	return (
		<TooltipInfo title={title}>
			필드를 좌우로 움직이면 그래프를 선택적으로 활성화할 수 있습니다.
		</TooltipInfo>
	);
}