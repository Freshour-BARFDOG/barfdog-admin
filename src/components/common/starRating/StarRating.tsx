import { useState } from "react";
import { themeVars } from "@/styles/theme.css";
import { starButtonStyle, starRatingWrapper } from "@/components/common/starRating/StarRating.css";
import { Star } from "lucide-react";

interface StarRatingProps {
	value: number;
	onChange: (value: number) => void;
	max?: number;
	size?: number;
}

export default function StarRating({
	value,
	onChange,
	max = 5,
	size = 24,
}: StarRatingProps) {
	const [hoverValue, setHoverValue] = useState<number | null>(null);

	return (
		<div className={starRatingWrapper}>
			{Array.from({ length: max }, (_, index) => {
				const filled = (hoverValue ?? value) > index;
				return (
					<button
						key={index}
						type="button"
						className={starButtonStyle}
						onClick={() => onChange(index + 1)}
						onMouseEnter={() => setHoverValue(index + 1)}
						onMouseLeave={() => setHoverValue(null)}
					>
						<Star
							size={size}
							strokeWidth={0}
							fill={filled ? themeVars.colors.yellow.yellow500 : themeVars.colors.gray.gray300}
						/>
					</button>
				);
			})}
		</div>
	);
}