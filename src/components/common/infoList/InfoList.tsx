import * as styles from './InfoList.css';
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import { infoItem } from '@/types/common';

interface InfoListProps {
	title?: string;
	items: infoItem[];
	className?: string;
	width?: string;
	direction?: 'col' | 'row';
	backgroundColor?: 'gray0' | 'gray50';
}

export default function InfoList({
	title,
	items,
	className = '',
	width,
	direction = 'col',
	backgroundColor = 'gray0',
}: InfoListProps) {
	return (
		<Card
			shadow='light'
			padding={16}
			align='start'
			className={className}
			style={{ width: !width ? 'auto' : width}}
			backgroundColor={backgroundColor}
		>
			{title && <Text type='headline1'>{title}</Text>}
			<ul className={styles.infoList({ direction: direction })}>
				{items.map((item) => (
					<li key={item.label} className={styles.infoItem({ direction: direction, align: item.align ?? 'center' })}>
						<Text type='body3' color='gray700' className={styles.infoLabel}>{item.label}</Text>
						{typeof item.value === 'string'
							? <Text type='label2'>{item.value}</Text>
							: item.value
						}
					</li>
				))}
			</ul>
		</Card>
	);
}