import * as styles from './SearchFilterKeyword.css';
import SelectBox from "@/components/common/selectBox/SelectBox";
import InputField from "@/components/common/inputField/InputField";
import { SelectOption } from "@/types/common";

interface SearchFilterKeywordProps<T extends string | number = string> {
	categoryOptions: SelectOption<T>[];
	selectedCategory: T;
	keyword: string;
	onChangeCategory: (value: T) => void;
	onChangeKeyword: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	onSubmit?: () => void;
	showConfirmButton?: boolean;
}

export default function SearchFilterKeyword<T extends string | number = string>({
	categoryOptions,
	selectedCategory,
	keyword,
	onChangeCategory,
	onChangeKeyword,
	placeholder,
	disabled = false,
	onSubmit,
	showConfirmButton = false,
}: SearchFilterKeywordProps<T>) {
	return (
		<div className={styles.searchFilterKeyword}>
			<SelectBox<T>
				options={categoryOptions}
				value={selectedCategory}
				onChange={onChangeCategory}
				disabled={disabled}
			/>
			<div className={styles.searchFilterInput}>
				<InputField
					value={keyword}
					onChange={(e) => onChangeKeyword(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
					onSubmit={onSubmit}
					confirmButton={showConfirmButton}
					confirmButtonDisabled={disabled}
					confirmButtonText='검색'
					confirmButtonVariant='solid'
				/>
			</div>
		</div>
	);
};
