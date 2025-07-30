import { themeVars } from "@/styles/theme.css";
import { PieLabelProps } from "recharts/types/polar/Pie";

export default function PieChartLabel(props: PieLabelProps) {
	const { outerRadius, cx, cy, midAngle, value, labelText } = props;
	// 라벨 위치를 outerRadius보다 작게 (내부쪽) 설정, 예: outerRadius - 20
	const radius = outerRadius + 15;

	// 중간 각도(rad) 계산
	const RADIAN = Math.PI / 180;
	const x = cx + radius * Math.cos(-!midAngle * RADIAN);
	const y = cy + radius * Math.sin(-!midAngle * RADIAN);
	if (value === 0) return null;
	return (
		<text
			x={x}
			y={y}
			fill={themeVars.colors.gray.gray900}
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
			style={{ fontSize: 12, fontWeight: 'bold' }}
		>
			{labelText ?? value}
		</text>
	);
}