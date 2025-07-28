import * as styles from './SearchFilterGroup.css';
import Card from "@/components/common/card/Card";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import Divider from "@/components/common/divider/Divider";
import Button from "@/components/common/button/Button";
import { SearchFilterItem } from '@/types/common';

interface SearchFilterGroupProps {
	items: SearchFilterItem[];
	onSubmit: () => void;
	onReset: () => void;
}

export default function SearchFilterGroup({
	items,
	onSubmit,
	onReset,
}: SearchFilterGroupProps) {
	return (
		<Card shadow='none' padding={40} gap={16} align='start'>
			{items.map(({ label, children, align = 'center' }, index) => (
				<div key={index} className={styles.searchItemBox}>
					<div className={styles.searchItem({ align })}>
						<InputLabel label={label} labelColor="gray800" className={styles.searchItemLabel} />
						<div className={styles.searchItemInput}>
							{children}
						</div>
					</div>
					<Divider thickness={1} color="gray200" />
				</div>
			))}
			<div className={styles.searchButtonControls}>
				<Button fullWidth onClick={onSubmit}>검색</Button>
				<Button fullWidth variant='outline' type='assistive' onClick={onReset}>초기화</Button>
			</div>
		</Card>
	);
}