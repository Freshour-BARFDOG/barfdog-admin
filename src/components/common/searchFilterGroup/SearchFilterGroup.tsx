import * as styles from './SearchFilterGroup.css';
import Card from "@/components/common/card/Card";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import Divider from "@/components/common/divider/Divider";
import Button from "@/components/common/button/Button";
import { SearchFilterItem } from '@/types/common';

interface SearchFilterGroupProps {
	items: SearchFilterItem[];
	onSubmit?: () => void;
	onReset?: () => void;
	disabled?: boolean;
	padding?: 'none' | 40;
}

export default function SearchFilterGroup({
	items,
	onSubmit,
	onReset,
	disabled = false,
	padding = 40,
}: SearchFilterGroupProps) {
	return (
		<Card shadow='none' padding={padding} gap={16} align='start'>
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
			{(onSubmit || onReset) && (
				<div className={styles.searchButtonControls}>
					<Button disabled={disabled} fullWidth onClick={onSubmit}>검색</Button>
					<Button disabled={disabled} fullWidth variant='outline' type='assistive' onClick={onReset}>초기화</Button>
				</div>
			)}
		</Card>
	);
}